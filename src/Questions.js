import React from 'react';
import './App.css';

function question(){
  const handleSubmit = event => {
   event.preventDefault();
   alert('You have submitted the form.')
 }

  return(
    <div className="wrapper">
      <h1>How About Them Apples</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Name</p>
            <input name="name" />
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default question;
