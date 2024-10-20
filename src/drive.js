const fs = require('fs');
const { google } = require('googleapis');
const multer = require('multer');
const router = require('./router')

const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json', // Baixado do Google Cloud Console
  scopes: ['https://www.googleapis.com/auth/drive.file']
});

const drive = google.drive({ version: 'v3', auth });

const upload = multer({ dest: 'uploads/' }); // Middleware para uploads

// Rota para fazer upload de imagens para o Google Drive
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileMetadata = {
      name: req.file.originalname,
      parents: ['1oOSJ9HX8q6RdZ-4bzFgn4d8YVSIaxq3I'] // ID da pasta compartilhada
    };
    const media = { mimeType: req.file.mimetype, body: fs.createReadStream(req.file.path) };
    
    const response = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id'
    });
    
    fs.unlinkSync(req.file.path); // Deletar arquivo local após o upload
    
    res.json({ fileId: response.data.id });
  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({ error: 'Erro no upload' });
  }
});

router.get('/file/:id', async (req, res) => {
    try {
      const fileId = req.params.id;
      const response = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' });
      response.data.pipe(res);
    } catch (error) {
      console.error('Erro ao baixar arquivo:', error);
      res.status(500).json({ error: 'Erro ao baixar arquivo' });
    }
  });


  
// Rota para listar todos os arquivos de imagem em uma pasta do Google Drive
router.get('/files', async (req, res) => {
  try {
    const folderId = '1oOSJ9HX8q6RdZ-4bzFgn4d8YVSIaxq3I'; // ID da pasta compartilhada

    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/'`,
      fields: 'nextPageToken, files(id, name, mimeType)',
      pageSize: 10, // Exibir 10 arquivos por vez
      pageToken: req.query.pageToken // Para usar a paginação no frontend
    });      

    const files = response.data.files;

    if (files.length === 0) {
      return res.status(404).json({ message: 'Nenhuma imagem encontrada.' });
    }

    // Adicionando a data de upload para cada arquivo (pode ser apenas o timestamp do upload)
    const filesWithDate = files.map(file => ({
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      uploadedAt: new Date().toISOString(), // Adicionando a data de upload
    }));

    // Retorna a lista de imagens
    res.json(filesWithDate);
  } catch (error) {
    console.error('Erro ao listar arquivos:', error);
    res.status(500).json({ error: 'Erro ao listar arquivos' });
  }
});

module.exports = router; 