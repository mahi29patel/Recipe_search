/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { AiFillEdit } from 'react-icons/ai'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Edit({ recipe }) {
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    const [title, setTitle] = useState(null)
    const [category, setCategory] = useState(null)
    const [img, setImg] = useState(null)
    const [ingredients, setIngredients] = useState(null)
    const [description, setDescription] = useState(null)
    const [directions, setDirections] = useState(null)

    const handleSubmit = async () => {

        const nd = directions && directions.split('*')

        const obj = {
            title, category, img, ingredients, description, directions: nd
        }
        // remove null values
        const data = Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));

        try {
            const res = await axios.put(`https://dt-recipe-api.herokuapp.com/api/recipe/update/${recipe._id}`, data)

            toast.success("Updated recipe successfully")
            window.location.reload()

        } catch (error) {
            toast.error("failed to update recipe")
            console.log(error)
        }

        console.log(data)

    }

    return (
        <div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div class="w-full ">
                                        {/* <h2>Edit {recipe && recipe.title}</h2> */}
                                        <h2 class="tracking-widest text-center text-lg title-font font-medium text-gray-900 mb-1"> EDIT {recipe.title} </h2>
                                        <form onSubmit={handleSubmit} class="bg-white  rounded px-8 pt-6 pb-8 mb-4">
                                            <div class="mb-4">
                                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                    Category
                                                </label>
                                                <input onChange={(e) => { setCategory(e.target.value) }} defaultValue={recipe.category} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="category" disabled={true}></input>
                                            </div>
                                            <div class="mb-4">
                                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                    Title
                                                </label>
                                                <input onChange={(e) => { setTitle(e.target.value) }} defaultValue={recipe.title} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="title" disabled={true}></input>
                                            </div>
                                            <div class="mb-4">
                                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                    Image
                                                </label>
                                                <input onChange={(e) => { setImg(e.target.value) }} defaultValue={recipe.img} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="img" type="text" placeholder="image url" disabled={true}></input>
                                            </div>
                                            <div class="mb-4">
                                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                    Ingredients
                                                </label>
                                                <input onChange={(e) => { setIngredients(e.target.value) }} defaultValue={recipe.ingredients} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="ingredients" type="text" placeholder="Recipe ingredients"></input>
                                            </div>
                                            <div class="mb-4">
                                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                    Description
                                                </label>
                                                <textarea onChange={(e) => { setDescription(e.target.value) }} defaultValue={recipe.description} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="Desription"></textarea>
                                            </div>
                                            <div class="mb-4">
                                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                    Directions (Add '*' between steps to seperate them)
                                                </label>
                                                <textarea onChange={(e) => { setDirections(e.target.value) }} defaultValue={recipe.directions.map(d => `${d} *`)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="directions" type="text" placeholder="Directions"></textarea>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={handleSubmit}
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <a onClick={() => { setOpen(prev => !prev) }} class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                <AiFillEdit color={'ffbf00'} size={20} />
            </a>
        </div>
    )
}
