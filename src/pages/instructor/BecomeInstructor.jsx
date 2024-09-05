import React from 'react'
import { useState } from 'react'
import TutorImg from '../../assets/images/tutor.png'
import { BecomeInstructorForm } from './BecomeInstructorForm'
import Footer from '../user/common/Footer'
import { useNavigate } from 'react-router-dom';

export const BecomeInstructor = () => {

    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false)

    const handleApplyNow = () => {
        setShowForm(true)
    }

    const handleLogoutClick = () => {
        localStorage.removeItem('access');
        // dispatch(setAuthenticated(false)); // Dispatch action to update isAuthenticated
        navigate('/logout');
    };

    return (
        <>
            <div>
                <div className='bg-slate-200 p-8 flex items-center'>
                    <div className='flex-1 text-center'>
                        <h1 className='text-3xl font-medium'>
                            Application to become instructor
                        </h1>
                    </div>
                    <button onClick={handleLogoutClick} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                        Logout
                    </button>
                </div>
                {!showForm ? (
                    <>
                        <div className='flex'>
                            <div className=' w-1/2 h-auto justify-center flex-col ps-80  pt-44'>
                                <h1 className='text-5xl font-semibold pt-24'>Become an Instuctor</h1>

                                <p className='pt-6'>Teaching is a vital and admirable career. As such, it comes with quite a bit of responsibility, both in practice and in preparation with many skills required to be a teacher. The following steps provide a general breakdown of the requirements for teachers:</p>
                                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded mt-4' onClick={handleApplyNow}>Apply Now</button>
                            </div>
                            <div className=' w-1/2 h-auto justify-center flex-col -z-50'>

                                <img className='object-fill h-75 w-' src={TutorImg} alt="" />
                            </div>
                        </div>
                        <div className=' -mt-16 z-50 bg-slate-100 pb-10 flex justify-center items-center flex-col'>
                            <h1 className='text-3xl pt-20 font-bold'>You can be your guiding star with <br /></h1>
                            <h1 className='text-3xl  font-bold'> our help</h1>
                            <div className='flex flex-col justify-center items-center' >

                                <p className='w-5/5  pt-8 felx justify-center items-center'>As it so contrasted oh estimating instrument. Size like body someone had. Are conduct </p>
                                <p>viewing boy minutes warrant the expense? Tolerably behavior may admit daughters offending</p>
                                <p> her ask own. Praise effect wishes change way and any wanted.</p>
                            </div>
                        </div>
                        <div>
                            <hr />
                            <div className='flex p-28 gap-14'>
                                <div className='flex flex-col justify-center items-center'>
                                    <h3 className='text-2xl font-bold  '>Create Account</h3>
                                    <p className='pt-5'>Satisfied conveying a dependent contented he gentleman agreeable do be. Delivered dejection necessary objection</p>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <h3 className='text-2xl font-bold  '>Add Your Course</h3>
                                    <p className='pt-5'>Proceed how any engaged visitor. Explained propriety off out perpetual his you. Feel sold off felt nay rose met you</p>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <h3 className='text-2xl font-bold '>Start Earning Money</h3>
                                    <p className='pt-5'>Insipidity the sufficient discretion imprudence resolution sir him decisively. Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in </p>
                                </div>
                            </div>
                        </div>

                    </>
                ) : (
                    <BecomeInstructorForm />
                )}
                <Footer />
            </div>
        </>
    )
}
