import React, {useState, useEffect} from 'react';
import axios from 'axios';

const NewReview = ({setIsPost, setOpenReviewModal})=>{

  const [fitVal, setFitVal] = useState({
    rate: '',
    text: {
      '1': 'Runs tight',
      '2': 'Runs slightly tight',
      '3': 'Perfect',
      '4': 'Runs slightly long',
      '5': 'Runs long'
    }});
  const [lengthVal, setLengthVal] = useState({
    rate: '',
    text: {
      '1': 'Runs Short',
      '2': 'Runs slightly short',
      '3': 'Perfect',
      '4': 'Runs slightly long',
      '5': 'Runs long'
    }});
  const [qualityVal, setQualityVal] = useState({
    rate: '',
    text: {
      '1': 'Poor',
      '2': 'Below average',
      '3': 'What I expected',
      '4': 'Pretty great',
      '5': 'Perfect'
    }});
  const [comfortVal, setComfortVal] = useState({
    rate: '',
    text: {
      '1': 'Uncomfortable',
      '2': 'Slightly uncomfortable',
      '3': 'Ok',
      '4': 'Comfortable',
      '5': 'Perfect'
    }});
  const [widthVal, setWidthVal] = useState({
    rate: '',
    text: {
      '1': 'Too narrow',
      '2': 'Slightly narrow',
      '3': 'Perfect',
      '4': 'Slightly wide',
      '5': 'Too wide'
    }});
  const [sizeVal, setSizeVal] = useState({
    rate: '',
    text: {
      '1': 'A size too small',
      '2': '½ a size too small',
      '3': 'Perfect',
      '4': '½ a size too big',
      '5': 'A size too wide'
    }});
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const postReview = function () {
    axios.post('http://localhost:3000/ratings/postReview')
      .then(()=>{
        setIsPost(true);
        setOpenReviewModal(false);
      })
      .catch((err) => {
        console.log('client side postReview error:', err);
      });
  };
  return (
    <div className="newReview-Background">
      <div className="newReview-Container">
        <div className="newReview-TopCloseBtn">
          <button
            onClick={() => {
              setOpenReviewModal(false);
            }}
          >
              X
          </button>
        </div>
        <div className="title">
          <h1>Write Your Review</h1>
          <h3>About the [Product Name Here]</h3>
        </div>
        <div className="newReview-Body">
          <div className="newReview-overallRating ">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input className='newReview-Star-Input'
                    type='radio'
                    name='rating'
                    value={ratingValue}
                    onClick={() => { setRating(ratingValue); }}
                  />
                  <span className= {ratingValue <= (rating || hover) ? 'newReview-Star-After' : 'newReview-Star'}
                    onMouseEnter={() => { setHover(ratingValue); }}
                    onMouseLeave={() => { setHover(null); }}>
                  </span>
                </label>
              );
            })}
            <span>The text will vary as follows</span>
          </div>
          <div className= 'newReview-Recommended'>
            <h3>Do you recommend this product ?</h3>
            <input type="radio" id="newReview-recommendedY" name="recommended" value="Yes" />
            <label htmlFor="newReview-recommendedY">Yes</label>
            <input type="radio" id="newReview-recommendedN" name="recommended" value="No" />
            <label htmlFor="newReview-recommendedN">No</label>
          </div>

          <div className='newReview-Characteristics'>
            <h3>Characteristics</h3>
            <div className='newReview-Characteristics-Fit'>
              <p>{fitVal.rate ? fitVal.text[fitVal.rate] : 'none selected'}</p>
              <span style={{fontWeight: 'bold'}}>Fit</span>
              <input type="radio" id="newReview-fit-1" name="Fit-1" value="1" checked={fitVal.rate === '1' ? true : false} onChange={e => {
                setFitVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-fit-1">1</label>
              <input type="radio" id="newReview-fit-2" name="Fit-2" value="2" checked={fitVal.rate === '2' ? true : false} onChange={e => {
                setFitVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-fit-2">2</label>
              <input type="radio" id="newReview-fit-3" name="Fit-3" value="3" checked={fitVal.rate === '3' ? true : false} onChange={e => {
                setFitVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-fit-3">3</label>
              <input type="radio" id="newReview-fit-4" name="Fit-4" value="4" checked={fitVal.rate === '4' ? true : false} onChange={e => {
                setFitVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-fit-4">4</label>
              <input type="radio" id="newReview-fit-5" name="Fit-5" value="5" checked={fitVal.rate === '5' ? true : false} onChange={e => {
                setFitVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-fit-5">5</label>
              <p>1=Runs tight, 5=Runs long</p>
            </div>

            <div className='newReview-Characteristics-Length'>
              <p>{lengthVal.rate ? lengthVal.text[lengthVal.rate] : 'none selected'}</p>
              <span style={{fontWeight: 'bold'}}>Length</span>
              <input type="radio" id="newReview-length-1" name="Length-1" value="1" checked={lengthVal.rate === '1' ? true : false} onChange={e => {
                setLengthVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-length-1">1</label>
              <input type="radio" id="newReview-length-2" name="Length-2" value="2" checked={lengthVal.rate === '2' ? true : false} onChange={e => {
                setLengthVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-length-2">2</label>
              <input type="radio" id="newReview-length-3" name="Length-3" value="3" checked={lengthVal.rate === '3' ? true : false} onChange={e => {
                setLengthVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-length-3">3</label>
              <input type="radio" id="newReview-length-4" name="Length-4" value="4" checked={lengthVal.rate === '4' ? true : false} onChange={e => {
                setLengthVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-length-4">4</label>
              <input type="radio" id="newReview-length-5" name="Length-5" value="5" checked={lengthVal.rate === '5' ? true : false} onChange={e => {
                setLengthVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-length-5">5</label>
              <p>1=Runs Short, 5=Runs long</p>
            </div>

            <div className='newReview-Characteristics-Quality'>
              <p>{qualityVal.rate ? qualityVal.text[qualityVal.rate] : 'none selected'}</p>
              <span style={{fontWeight: 'bold'}}>Quality</span>
              <input type="radio" id="newReview-quality-1" name="Quality-1" value="1" checked={qualityVal.rate === '1' ? true : false} onChange={e => {
                setQualityVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-quality-1">1</label>
              <input type="radio" id="newReview-quality-2" name="Quality-2" value="2" checked={qualityVal.rate === '2' ? true : false} onChange={e => {
                setQualityVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-quality-2">2</label>
              <input type="radio" id="newReview-quality-3" name="Quality-3" value="3" checked={qualityVal.rate === '3' ? true : false} onChange={e => {
                setQualityVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-quality-3">3</label>
              <input type="radio" id="newReview-quality-4" name="Quality-4" value="4" checked={qualityVal.rate === '4' ? true : false} onChange={e => {
                setQualityVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-quality-4">4</label>
              <input type="radio" id="newReview-quality-5" name="Quality-5" value="5" checked={qualityVal.rate === '5' ? true : false} onChange={e => {
                setQualityVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-quality-5">5</label>
              <p>1=Poor, 5=Perfect</p>
            </div>


            <div className='newReview-Characteristics-Comfort'>
              <p>{comfortVal.rate ? comfortVal.text[comfortVal.rate] : 'none selected'}</p>
              <span style={{fontWeight: 'bold'}}>Comfort</span>
              <input type="radio" id="newReview-comfort-1" name="Comfort-1" value="1" checked={comfortVal.rate === '1' ? true : false} onChange={e => {
                setComfortVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-quality-1">1</label>
              <input type="radio" id="newReview-comfort-2" name="Comfort-2" value="2" checked={comfortVal.rate === '2' ? true : false} onChange={e => {
                setComfortVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-quality-2">2</label>
              <input type="radio" id="newReview-comfort-3" name="Comfort-3" value="3" checked={comfortVal.rate === '3' ? true : false} onChange={e => {
                setComfortVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-quality-3">3</label>
              <input type="radio" id="newReview-comfort-4" name="Comfort-4" value="4" checked={comfortVal.rate === '4' ? true : false} onChange={e => {
                setComfortVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-quality-4">4</label>
              <input type="radio" id="newReview-comfort-5" name="Comfort-5" value="5" checked={comfortVal.rate === '5' ? true : false} onChange={e => {
                setComfortVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-comfort-5">5</label>
              <p>1=Uncomfortable, 5=Perfect</p>
            </div>

            <div className='newReview-Characteristics-Width'>
              <p>{widthVal.rate ? widthVal.text[widthVal.rate] : 'none selected'}</p>
              <span style={{fontWeight: 'bold'}}>Width</span>
              <input type="radio" id="newReview-width-1" name="Width-1" value="1" checked={widthVal.rate === '1' ? true : false} onChange={e => {
                setWidthVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-width-1">1</label>
              <input type="radio" id="newReview-width-2" name="Width-2" value="2" checked={widthVal.rate === '2' ? true : false} onChange={e => {
                setWidthVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-width-2">2</label>
              <input type="radio" id="newReview-width-3" name="Width-3" value="3" checked={widthVal.rate === '3' ? true : false} onChange={e => {
                setWidthVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-width-3">3</label>
              <input type="radio" id="newReview-width-4" name="Width-4" value="4" checked={widthVal.rate === '4' ? true : false} onChange={e => {
                setWidthVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-width-4">4</label>
              <input type="radio" id="newReview-width-5" name="Width-5" value="5" checked={widthVal.rate === '5' ? true : false} onChange={e => {
                setWidthVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-width-5">5</label>
              <p>1=Too narrow, 5=Too width</p>
            </div>

            <div className='newReview-Characteristics-Size'>
              <p>{sizeVal.rate ? sizeVal.text[sizeVal.rate] : 'none selected'}</p>
              <span style={{fontWeight: 'bold'}}>Size</span>
              <input type="radio" id="newReview-size-1" name="Size-1" value="1" checked={widthVal.rate === '1' ? true : false} onChange={e => {
                setSizeVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-size-1">1</label>
              <input type="radio" id="newReview-size-2" name="Size-2" value="2" checked={widthVal.rate === '2' ? true : false} onChange={e => {
                setSizeVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-size-2">2</label>
              <input type="radio" id="newReview-size-3" name="Size-3" value="3" checked={widthVal.rate === '3' ? true : false} onChange={e => {
                setSizeVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-size-3">3</label>
              <input type="radio" id="newReview-size-4" name="Size-4" value="4" checked={widthVal.rate === '4' ? true : false} onChange={e => {
                setSizeVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-size-4">4</label>
              <input type="radio" id="newReview-size-5" name="Size-5" value="5" checked={widthVal.rate === '5' ? true : false} onChange={e => {
                setSizeVal((prevState) => ({
                  ...prevState,
                  rate: e.target.value
                }));
              }} />
              <label htmlFor="newReview-size-5">5</label>
              <p>1=A size too small, 5=A size too wide</p>
            </div>

          </div>

        </div>
        <div className="newReview-Footer">
          <button
            onClick={() => {
              setOpenReviewModal(false);
            }}
            id="newReview-CancelBtn"
          >
              Cancel
          </button>
          <button onClick={()=>{ postReview(); }}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default NewReview;