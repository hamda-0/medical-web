import { LucideIcon } from 'lucide-react';
import React from 'react'

interface PageHeaderProps {
    title: string;
    description: string;
    Icon: LucideIcon
}
const PageHeader: React.FC<PageHeaderProps> = ({ title, Icon, description }) => {
    return (
        <div className="max-w-7xl mx-auto mb-8">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                    <Icon className="size-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                    {title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default PageHeader
