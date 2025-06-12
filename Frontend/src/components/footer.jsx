import React from 'react'

export default function footer() {
  return (
        <footer className="bg-[url('/footer-bg.svg')] bg-cover bg-no-repeat bg-center text-sm text-gray-800 py-2 px-6">
        <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
            
            {/* Logo */}
            <div className="flex items-center md:col-span-1">
            <img src="/LogoWasteWise.svg" className="w-[192px]" alt="WasteWise Logo" />
            </div>

            <div>
            <h3 className="text-[32px] text-[#68625B] font-bold">Social media</h3>
            <span className="block w-[85px] h-[4px] bg-[#85BA09] mb-3 -mt-1"></span>
            <ul className="space-y-2">
                <li className="flex items-center gap-2">
                <img src="phone.svg" className="w-[25px]" alt="WhatsApp" />
                +62 81-297-894-752
                </li>
                <li className="flex items-center gap-2">
                <img src="phone.svg" className="w-[25px]" alt="WhatsApp" />
                +62 81-297-894-752
                </li>
            </ul>
            </div>

            <div className="mt-13">
            <ul className="space-y-2">
                <li className="flex items-center gap-2">
                <img src="instagrams.svg" className="w-[25px]" alt="Instagram" />
                @Waste_Wise
                </li>
                <li className="flex items-center gap-2">
                <img src="/facebookk.svg" className="w-[25px]" alt="Facebook" />
                Waste_Wise
                </li>
            </ul>
            </div>

            <div>
            <h3 className="text-[32px] text-[#68625B] font-bold">Contacts</h3>
            <span className="block w-[85px] h-[4px] bg-[#85BA09] mb-3 -mt-1"></span>
            <ul className="space-y-2">
                <li className="flex items-center gap-2">
                <img src="/phone.svg" className="w-[25px]" alt="Phone" />
                +62 21-297-894-752
                </li>
                <li className="flex items-center gap-2">
                <img src="/phone.svg" className="w-[25px]" alt="Phone" />
                +62 21-297-894-752
                </li>
                <li className="flex items-center gap-2 mt-2">
                <img src="/mail.svg" className="w-[25px]" alt="Email" />
                Wastewise@gmail.com
                </li>
            </ul>
            </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6">
            <span className="block w-full h-[3px] bg-[#85BA09] mb-2"></span>
            <p className="text-[14px]">
            ©2025 WasteWise. All Rights Reserved.
            </p>
        </div>
        </footer>

  )
}
