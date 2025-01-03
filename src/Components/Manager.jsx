import React, { useEffect, useRef, useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    let [showPassword, setShowPassword] = useState(false)
    let [form, setForm] = useState({ site: '', username: '', password: '' })
    let [passwordArray, setPasswordArray] = useState([])

    let passwordRef = useRef()

    let id;

    const password = () => {
        setShowPassword((prev) => {
            showPassword = !prev
            passwordRef.current.type = showPassword ? "text" : "password"
            return showPassword
        })
    }

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const savePassword = () => {
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        setForm({ site: '', username: '', password: '' })
        toast.success(<strong>Successfully Saved😃!</strong>)
    }

    const deletePassword = (id) => {
        let c = confirm("Do you really want to delete this? 🤨")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast.success(<strong>Successfully Deleted😃!</strong>)
        }
    }

    const editPassword = (id) => {
        setForm(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    let copyText = (item) => {
        window.navigator.clipboard.writeText(item)
        toast.success(<strong>Successfully Copied😃!</strong>)
    }

    return (
        <div>
            <ToastContainer
                autoClose={1000} toastStyle={{ backgroundColor: "#d5f8e1", color: '#166534' }} />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50">
                <div
                    className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"
                ></div>
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            </div>

            <div className="lg:mycontainer pt-4">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className="text-green-500">&lt;</span>
                    Pass
                    <span className="text-green-500">OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'><strong>Your Own Password Manager</strong></p>
                <div className="text-black flex flex-col p-4 gap-6 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className="rounded-full border border-green-600 w-full p-4 py-1" type="text" name="site" id="site" />
                    <div className="flex md:flex-row flex-col w-full md:gap-10 gap-6">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className="rounded-full border border-green-600 md:w-[50%] p-4 py-1" type="text" name="username" id="username" />
                        <div className="relative md:w-[50%]">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className="rounded-full border border-green-600 w-full p-4 py-1" type="password" name="password" id="password" />
                            <span className='absolute right-3 top-[10px] cursor-pointer' onClick={password}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                        </div>
                    </div>
                    <div onClick={() => form.site && form.username && form.password && savePassword()} className='flex justify-center items-center bg-green-500 rounded-full py-2 px-4 w-fit hover:bg-green-400 gap-2 border-green-900 border cursor-pointer'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" />
                        <strong>Save</strong>
                    </div>
                </div>
            </div>

            <div className="passwords md:pl-[18%] md:text-left text-center">
                <h2 className='font-bold text-2xl pb-4'>Your Passwords</h2>
                {passwordArray.length === 0 ?
                    (<div className='font-semibold'>No passwords to display</div>) :
                    (<table className="table-auto md:w-[78%] rounded-md mb-20 text-center sm:ml-[10%] md:ml-0">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className="py-2 border border-white text-center w-[45%]">
                                        <div className="flex justify-center items-center md:gap-8 pl-3">
                                            <a href={item.site} target="_blank">{item.site}</a>
                                            <lord-icon
                                                onClick={() => copyText(item.site)}
                                                style={{ height: "18px", cursor: "Pointer" }}
                                                src="https://cdn.lordicon.com/depeqmsz.json"
                                                trigger="hover">
                                            </lord-icon>
                                        </div>
                                    </td>
                                    <td className="py-2 border border-white text-center w-[20%]">
                                        <div className="flex justify-center items-center md:gap-8 pl-3">
                                            {item.username}
                                            <lord-icon
                                                onClick={() => copyText(item.username)}
                                                style={{ height: "18px", cursor: "Pointer" }}
                                                src="https://cdn.lordicon.com/depeqmsz.json"
                                                trigger="hover">
                                            </lord-icon>
                                        </div>
                                    </td>
                                    <td className="py-2 border border-white text-center w-[20%]">
                                        <div className="flex justify-center items-center md:gap-8 pl-3">
                                            {item.password}
                                            <lord-icon
                                                onClick={() => copyText(item.password)}
                                                style={{ height: "18px", cursor: "Pointer" }}
                                                src="https://cdn.lordicon.com/depeqmsz.json"
                                                trigger="hover">
                                            </lord-icon>
                                        </div>
                                    </td>
                                    <td className="py-2 border border-white text-center w-[15%]">
                                        <div className="flex justify-center items-center md:gap-6">
                                            <lord-icon
                                                onClick={() => editPassword(item.id)}
                                                src="https://cdn.lordicon.com/qnpnzlkk.json"
                                                trigger="hover"
                                                style={{ height: "18px", cursor: "Pointer" }}>
                                            </lord-icon>
                                            <lord-icon
                                                onClick={() => deletePassword(item.id)}
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ height: "18px", cursor: "Pointer" }}>
                                            </lord-icon>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>)}
            </div>
        </div >
    )
}

export default Manager
