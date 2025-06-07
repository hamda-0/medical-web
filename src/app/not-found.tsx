'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Home } from 'lucide-react';
import Link from 'next/link';

const NotFound = () => {


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
            <Card className="w-full max-w-md backdrop-blur-sm border-none shadow-sm">
                <CardHeader className="text-center space-y-4">
                    <div className="flex justify-center">
                        <AlertTriangle className="h-16 w-16 text-yellow-500 animate-pulse" />
                    </div>
                    <CardTitle className="text-4xl font-bold text-gray-900 dark:text-white">404 - Page Not Found</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Oops! It seems you’ve wandered off the map. The page you’re looking for doesn’t exist or has been moved.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                        Let’s get you back on track. Head back to the homepage or try a different path.
                    </p>
                    <Link href="/" passHref>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200">
                            <Home className="h-5 w-5 mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
};

export default NotFound;