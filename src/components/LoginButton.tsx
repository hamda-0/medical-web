import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const LoginButton = () => {
    return (
        <Link href="/login">
            <Button variant="ghost" size="sm">Login</Button>
        </Link>
    )
}

export default LoginButton
