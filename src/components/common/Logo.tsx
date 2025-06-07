import React from 'react'
import { appName } from '@/constants/constants'
import {  Stethoscope } from 'lucide-react'
import Link from 'next/link'

const Logo = () => {
    return (
        <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Stethoscope className='size-4 text-white' />
            </div>
            <span className="font-bold text-xl text-foreground">{appName}</span>
        </Link>
    )
}

export default Logo
