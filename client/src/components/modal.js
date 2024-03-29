import React,{ Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

function Modal(props) {
    const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)
  return (
     
     <>
     <Transition.Root show={props.loading} as={Fragment}>
     <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
       <Transition.Child
         as={Fragment}
         enter="ease-out duration-300"
         enterFrom="opacity-0"
         enterTo="opacity-100"
         leave="ease-in duration-200"
         leaveFrom="opacity-100"
         leaveTo="opacity-0"
       >
         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
       </Transition.Child>

       <div className="fixed z-10 inset-0 overflow-y-auto">
         <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
           <Transition.Child
             as={Fragment}
             enter="ease-out duration-300"
             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
             enterTo="opacity-100 translate-y-0 sm:scale-100"
             leave="ease-in duration-200"
             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
           >
             <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                 <div className="sm:flex sm:items-start">
                 
                   <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                     <Dialog.Title as="h3" className="text-lg leading-6 font-black text-gray-900">
                     {props.title}
                     </Dialog.Title> 
                     <div className="mt-2 justify-center items-center">
                       <img src="https://cutewallpaper.org/21/loading-gif-transparent-background/Update-throbber-icon-in-Seven-theme-2775725-Drupalorg.gif" style={{width: 50, height: 50}}/>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {/* <button
                   type="button"
                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                   onClick={() => setOpen(false)}
                 >
                   Deactivate
                 </button> */}
               
               </div>
             </Dialog.Panel>
           </Transition.Child>
         </div>
       </div>
     </Dialog>
   </Transition.Root>
   </>
  )
}

export default Modal