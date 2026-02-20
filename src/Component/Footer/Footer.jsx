import React from 'react'

const Footer = () => {
  return (
    

<footer class="bg-amber-300 justify-center items-center  justify-center items-center">
    <div class="mx-auto w-full max-w-screen-xl ">
      <div class="grid grid-cols-2 gap-8 px-4 py-3 lg:py-8 md:grid-cols-3 ">
        <div className='flex flex-col text-center justify-center items-center '>
            <h2 class="mb-6 text-sm font-bold text-heading uppercase ">Company</h2>
            <ul class="text-body font-medium">
                <li class="mb-2">
                    <a href="#" class=" hover:underline">About</a>
                </li>
                <li class="mb-2">
                    <a href="#" class="hover:underline">Careers</a>
                </li>
                <li class="mb-2">
                    <a href="#" class="hover:underline">Product</a>
                </li>
                <li class="mb-2">
                    <a href="#" class="hover:underline">Blog</a>
                </li>
            </ul>
        </div>
        <div className='flex flex-col text-center justify-center items-center '>
            <h2 class="mb-6 text-sm font-bold text-heading uppercase">Help center</h2>
            <ul class="text-body font-medium">
                <li class="mb-2">
                    <a href="#" class="hover:underline">Discord Server</a>
                </li>
                <li class="mb-2">
                    <a href="#" class="hover:underline">Twitter</a>
                </li>
                <li class="mb-2">
                    <a href="#" class="hover:underline">Facebook</a>
                </li>
                <li class="mb-2">
                    <a href="#" class="hover:underline">Contact Us</a>
                </li>
            </ul>
        </div>
        <div className='flex flex-col text-center '>
            <h2 class="mb-6 text-sm font-bold text-heading uppercase">Legal</h2>
            <ul class="text-body font-medium">
                <li class="mb-2">
                    <a href="#" class="hover:underline">Privacy Policy</a>
                </li>
                <li class="mb-2">
                    <a href="#" class="hover:underline">Licensing</a>
                </li>
                <li class="mb-2">
                    <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                </li>
            </ul>
        </div>
    </div>
    <div class="px-4 py-6 bg-neutral-secondary-soft md:flex md:items-center md:justify-between">
        <span class="text-sm text-body sm:text-center">© 2023 <a href="https://flowbite.com/">Flowbite™</a>. All Rights Reserved.
        </span>
        <div class="flex mt-4 sm:justify-center md:mt-0 space-x-2 rtl:space-x-reverse">
          <a href="#" class="text-body hover:text-heading">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clip-rule="evenodd"/></svg>
                <span class="sr-only">Facebook page</span>
            </a>
            <a href="#" class="text-body hover:text-heading ms-5">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M18.942 5.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.586 11.586 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3 17.392 17.392 0 0 0-2.868 11.662 15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.638 10.638 0 0 1-1.706-.83c.143-.106.283-.217.418-.331a11.664 11.664 0 0 0 10.118 0c.137.114.277.225.418.331-.544.328-1.116.606-1.71.832a12.58 12.58 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM8.678 14.813a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.929 1.929 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"/></svg>
                <span class="sr-only">Discord community</span>
            </a>
            <a href="#" class="text-body hover:text-heading ms-5">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z"/></svg>
            <span class="sr-only">Twitter page</span>
            </a>
            <a href="#" class="text-body hover:text-heading ms-5">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"/></svg>
                <span class="sr-only">GitHub account</span>
            </a>
        </div>
      </div>
      <div className="border-t mt-6  p-4 text-center text-sm font-semibold">
        <h1 className='text-[20px]'>Medical Disclaimer</h1>
      <p className="mt-2">
      The content on this website is not intended to diagnose, treat, cure, or prevent any disease. The information provided is not a substitute for professional medical advice. Please consult your physician or a qualified healthcare provider regarding any medical concerns.
    </p>
    </div>
    </div>
</footer>
    

  )
}

export default Footer