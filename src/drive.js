const fs = require('fs');
const { google } = require('googleapis');
const multer = require('multer');
const router = require('./router');

const FOLDER_ID = '1oOSJ9HX8q6RdZ-4bzFgn4d8YVSIaxq3I'; // ID da pasta do Drive

const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: ['https://www.googleapis.com/auth/drive']
});
const drive = google.drive({ version: 'v3', auth });
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { originalname, mimetype, path } = req.file;

    const response = await drive.files.create({
      resource: { name: originalname, parents: [FOLDER_ID] },
      media: { mimeType: mimetype, body: fs.createReadStream(path) },
      fields: 'id'
    });

    fs.unlinkSync(path); 
    res.json({ fileId: response.data.id });
  } 
  catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({ error: 'Erro no upload' });
  }
});

router.get('/file/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await drive.files.get({ fileId: id, alt: 'media' }, { responseType: 'stream' });
    response.data.pipe(res);
  } catch (error) {
    console.error('Erro ao baixar arquivo:', error);
    res.status(500).json({ error: 'Erro ao baixar arquivo' });
  }
});

router.get('/files', async (req, res) => {
  try {
    const response = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and mimeType contains 'image/'`,
      fields: 'files(id, name, mimeType, createdTime)',
      pageSize: 15,
      pageToken: req.query.pageToken
    });

    const files = response.data.files;
    if (!files.length) {
      return res.status(404).json({ message: 'Nenhuma imagem encontrada.' });
    }

    const arquivosComData = files.map(file => ({
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      createdTime: file.createdTime 
    }));

    res.json(arquivosComData);
  } catch (error) {
    console.error('Erro ao listar arquivos:', error);
    res.status(500).json({ error: 'Erro ao listar arquivos' });
  }
});

module.exports = router;