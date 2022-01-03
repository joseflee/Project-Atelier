import React, {useState} from 'react';

const PhotoUpload = (props) => {
  const [file, setFile] = useState([]);

  let uploadSingleFile = function uploadSingleFile(e) {
    setFile([...file, URL.createObjectURL(e.target.files[0])]);
  };

  let upload = function upload(e) {
    e.preventDefault();
    console.log('clicked on upload');
  };

  return (
    <div>
      <div className="form-group preview">
        {file.length > 0 &&
          file.map((item, index) => {
            return (
              <div key={item}>
                <img src={item} alt="" width={'350px'}/>
                <button type="button" onClick={() => deleteFile(index)}>
                  delete
                </button>
              </div>
            );
          })}
      </div>

      <div className="form-group">
        <input
          type="file"
          disabled={file.length === 5}
          className="form-control"
          onChange={uploadSingleFile}
        />
      </div>
      <button
        type="button"
        className="btn btn-primary btn-block"
        onClick={upload}
      >
        Upload photos
      </button>
    </div>
  );
};

export default PhotoUpload;