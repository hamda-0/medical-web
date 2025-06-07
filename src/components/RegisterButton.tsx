import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const RegisterButton = () => {
    return (
        <Link href="/register">
            <Button size="sm" className='text-white'>Register</Button>
        </Link>
    )
}

export default RegisterButton
