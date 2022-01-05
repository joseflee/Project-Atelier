import React, {useState} from 'react';

class PhotoUpload extends React.Component {
  //const [file, setFile] = useState([]);
  constructor(props) {
    super(props);
    this.state = {
      file: []
    };

    this.uploadSingleFile = this.uploadSingleFile.bind(this);
    //this.uploadImage = this.uploadImage.bind(this);

  }

  // uploadImage(base64file) {
  //   console.log(base64file);
  // }

  uploadSingleFile(e) {


    this.setState({
      file: [...this.state.file, (e.target.files[0])]
    }, ()=> {
      //this.props.handlePhotos(this.state.file);
      var photos = [...this.state.file];
      //make base 64 file from each photo
      for (var i = 0; i < photos.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(photos[i]);
        reader.onloadend = () => {
          this.props.handlePhotos(reader.result);
        };
        reader.onerror = () => {
          console.error('AHHHHHHHH!!');
          setErrMsg('something went wrong!');
        };
      }
    });



  }

  // let upload = function upload(e) {
  //   e.preventDefault();
  //   console.log('clicked on upload');
  //   props.handlePhotos(file);
  // };
  render() {
    return (
      <div>
        <div className="form-group preview">
          {this.state.file.length > 0 &&
          this.state.file.map((item, index) => {
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
            disabled={this.state.file.length === 5}
            className="form-control"
            onChange={this.uploadSingleFile}
          />
        </div>

      </div>
    );
  }
}

export default PhotoUpload;