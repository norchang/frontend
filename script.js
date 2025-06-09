async function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const status = document.getElementById('status');

  if (!fileInput.files.length) {
    status.textContent = 'Sila pilih fail video.';
    return;
  }

  const file = fileInput.files[0];

  // Gantikan dengan SAS URL anda (berakhir dengan tanda ?)
  const blobSasUrl = "https://<yourstorage>.blob.core.windows.net/dashcam-videos/" + file.name + "?<SAS_token_here>";

  status.textContent = 'Sedang memuat naik...';

  try {
    const response = await fetch(blobSasUrl, {
      method: 'PUT',
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': file.type
      },
      body: file
    });

    if (response.ok) {
      status.textContent = 'Muat naik berjaya ✅';
    } else {
      status.textContent = 'Gagal muat naik ❌';
      console.error(await response.text());
    }
  } catch (error) {
    status.textContent = 'Ralat semasa muat naik';
    console.error(error);
  }
}
