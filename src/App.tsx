import React, { ChangeEvent } from 'react'
import axios from 'axios'

const App: React.FC = () => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const uploadFile = files[0]
      const formData = new FormData()
      formData.append(uploadFile.name, uploadFile)
      axios.post('http://jsonplaceholder.typicode.com/posts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(resp => {
          console.log(resp)
        })
    }
  }
  return (
    <div className="App" style={{marginTop: 100, marginLeft: 100}}>
      <input type="file" name="myFile" onChange={handleFileChange} />
    </div>
  )
}

export default App;
