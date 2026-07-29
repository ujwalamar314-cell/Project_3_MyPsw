import { useState, useRef, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';
//Hello

function App() {

  const [passwordArray, setpasswordArray] = useState([])
  const [message, setmessage] = useState("Save Your")
  const [showpassword, setshowpassword] = useState(false)
  const [editstatus, seteditstatus] = useState(false)
  const [edit_id, setedit_id] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    id: "",
    url: "",
    username: "",
    password: ""
  })

  useEffect(() => {
    let passwords = localStorage.getItem("passwords")
    if (passwords) {
      setpasswordArray(JSON.parse(passwords))
    }
  }, [])

  const setPassword = data => {
    if (!(passwordArray.find(item => item.url == data.url && item.username == data.username && item.password == data.password))) {
      data.id = v4()
      setpasswordArray([...passwordArray, data])
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, data]))
      toast.success("Added Successfuly")
      reset()
    }
    else toast.error("The data entered is already saved")
  }

  const copyText = (text) => {
    toast.success(`Copied ${text}`)
    navigator.clipboard.writeText(text)
  }

  const deletePassword = (t_id) => {
    let choice = confirm("Are you sure you want to delete !")
    if (choice) {
      setpasswordArray(passwordArray.filter(item => item.id != t_id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id != t_id)))
      toast("Password Deleted")
    }

  }

  const submitEdit = (data) => {
    let choice = confirm("Confirm Your Edit")
    if (choice) {
      if (!(passwordArray.find(item => item.url == data.url && item.username == data.username && item.password == data.password))) {
        const updatePasswordArray = [...passwordArray.filter(item => item.id != edit_id), { ...data, edit_id }]
        localStorage.setItem("passwords", JSON.stringify(updatePasswordArray))
        setpasswordArray(updatePasswordArray)
        toast("Edit Successful")
        setmessage("Save Your")
      }
      else toast.error("The data entered is already saved")
    }
    setmessage("Save Your")
    reset({
      id: "",
      url: "",
      username: "",
      password: ""
    })
    seteditstatus(false)
    setedit_id("")
  }

  const editPassword = (t_id) => {
    let edit = passwordArray.find(item => item.id == t_id)
    reset({
      url: edit.url,
      username: edit.username,
      password: edit.password
    })
    setmessage("Edit Your")
    setedit_id(t_id)
    seteditstatus(true)
  }

  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <div className='flex flex-1 flex-col items-center bg-[radial-gradient(60%_120%_at_50%_100%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)] overflow-auto'>

        <div className='pt-10 font-bold text-3xl'>{message}<span className='text-red-400'> PsW</span></div>

        <form
          action=""
          onSubmit={handleSubmit(editstatus ? submitEdit : setPassword)}
          className='mx-auto md:w-[70%] w-full p-5  flex flex-col gap-4 mt-3 rounded-lg'>

          <div>

            <input
              className='bg-white w-full rounded-full px-3 py-2.5 md:py-1 outline-mauve-700 border-mauve-400 border-2 text-[14px]'
              type="text"
              placeholder='Enter URL'
              {...register('url', { required: { value: true, message: "URL is empty" } })} />

          </div>

          <div className='flex md:flex-row flex-col gap-4  justify-between'>

            <div className='flex-1'>
              <input
                className='bg-white rounded-full px-3 py-2.5 md:py-1 outline-mauve-700 border-mauve-400 border-2 text-[14px] w-full '
                type="text"
                placeholder='username'
                {...register('username', { required: { value: true, message: "Username is empty" } })} />
            </div>

            <div className=' relative flex-1'>
              <input
                className='bg-white rounded-full px-3 py-2.5 md:py-1 outline-mauve-700 border-mauve-400 border-2 text-[14px] w-full '
                type={showpassword ? "text" : "password"}
                placeholder='password'
                {...register('password', { required: { value: true, message: "Password is empty" } })} />

              <span
                className='absolute right-3 top-3.5 md:top-2 cursor-pointer'
                onClick={() => { showpassword ? setshowpassword(false) : setshowpassword(true) }}>

                <img
                  src={showpassword ? "show.svg" : "hide.svg"}
                  alt="show" />

              </span>
            </div>

          </div>
          <div className='text-center'>
            {errors.url && <div className='text-red-600'>{errors.url.message}</div>}
            {errors.username && <div className='text-red-600'>{errors.username.message}</div>}
            {errors.password && <div className='text-red-600'>{errors.password.message}</div>}
          </div>

          <div className='w-full flex flex-col items-center gap-4'>

            <button
              type="submit" disabled={isSubmitting}
              className='bg-mauve-300 w-fit self-center text-mauve-700 font-semibold py-1 px-6 rounded-full border-mauve-700 border-2 cursor-pointer hover:bg-mauve-500 hover:text-mauve-300 hover:border-mauve-300 transition justify-center items-center flex gap-2'>
              <lord-icon
                src="https://cdn.lordicon.com/efxgwrkc.json"
                trigger="hover"
                colors="primary:#2a212c"
                className="w-6">
              </lord-icon>
              {editstatus ? "Save Changes" : "Save"}
            </button>


          </div>

        </form>

        <div className='md:w-[70%] w-full rounded-lg p-5 mt-2.5'>

          <div className='pb-10 text-2xl font-bold'>Your Passwords</div>

          {passwordArray.length === 0 && <div>You Have Not Saved Any Passwords !</div>}
          {passwordArray.length != 0 &&

            <table className='w-full overflow-hidden rounded-lg bg-mauve-200'>
              <thead className='bg-mauve-700 text-white'>
                <tr className='*:py-1.5 '>
                  <th scope="col" className='w-[30%]'>URL</th>
                  <th scope="col" className='border-x-2 border-white w-[30%] '>Username</th>
                  <th scope="col" className='border-x-2 border-white w-[30%] ' >Password</th>
                  <th scope="col" className='w-[10%]' >Action</th>
                </tr>
              </thead>
              {passwordArray.map((element, index) => {
                return <tbody key={index}>
                  <tr className='*:p-1.5 *:border-t-2 *:border-white'>
                    <td className='w-[30%] text-center hover:underline'>
                      <a href={element.url} target='_blank'>{element.url}</a>
                    </td>

                    <td className='border-x-2 border-white w-[30%]'>

                      <div className='flex justify-between w-full'>
                        <div>
                          {element.username}
                        </div>

                        <div>
                          <button className='w-5 mix-blend-multiply cursor-pointer' onClick={() => { copyText(element.username) }}>
                            <img src='copy.png'
                              alt="" />
                          </button>
                        </div>
                      </div>

                    </td>

                    <td className='border-x-2 border-white w-[30%]'>

                      <div className='flex justify-between w-full'>
                        <div>
                          {element.password}
                        </div>

                        <div>
                          <button className='w-5 mix-blend-multiply cursor-pointer' onClick={() => { copyText(element.password) }}>
                            <img src='copy.png'
                              alt="" />
                          </button>
                        </div>
                      </div>

                    </td>

                    <td className='w-[10%] text-center'>
                      <div className="flex justify-around">

                        <button className='w-5 mix-blend-multiply cursor-pointer' onClick={() => { editPassword(element.id) }}>
                          <img
                            src='pencil.png'
                            alt="" />
                        </button>

                        <button className='w-5 mix-blend-multiply cursor-pointer' onClick={() => { deletePassword(element.id) }}>
                          <img
                            src='bin.png'
                            alt="" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              })}
            </table>
          }
          <div className=' bg-transparent text-transparent text-center text-3xl p-3 font-bold'>MyPsw</div>
        </div>
      </div>
      <Footer />
    </div>

  )
}

export default App
