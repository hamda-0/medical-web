import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import React from 'react'

const InfoCards = () => {
  const card = 'p-4 rounded-2xl bg-gradient-to-r'

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <Card className={cn(
        'from-blue-50 to-blue-100 border border-blue-200',
        'dark:from-blue-900 dark:to-blue-950 dark:border-blue-800',
        card
      )}>
        <CardContent className="text-center space-y-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full mx-auto flex items-center justify-center">
            <span className="text-white text-sm font-bold">1</span>
          </div>
          <h3 className="font-semibold text-blue-800 dark:text-blue-200">Enter Details</h3>
          <p className="text-blue-600 dark:text-blue-300 text-sm">Provide passport number and nationality</p>
        </CardContent>
      </Card>

      <Card className={cn(
        'from-purple-50 to-purple-100 border border-purple-200',
        'dark:from-purple-900 dark:to-purple-950 dark:border-purple-800',
        card
      )}>
        <CardContent className="text-center space-y-2">
          <div className="w-8 h-8 bg-purple-600 rounded-full mx-auto flex items-center justify-center">
            <span className="text-white text-sm font-bold">2</span>
          </div>
          <h3 className="font-semibold text-purple-800 dark:text-purple-200">Search</h3>
          <p className="text-purple-600 dark:text-purple-300 text-sm">View visa status instantly</p>
        </CardContent>
      </Card>

      <Card className={cn(
        'from-green-50 to-green-100 border border-green-200',
        'dark:from-green-900 dark:to-green-950 dark:border-green-800',
        card
      )}>
        <CardContent className="text-center space-y-2">
          <div className="w-8 h-8 bg-green-600 rounded-full mx-auto flex items-center justify-center">
            <span className="text-white text-sm font-bold">3</span>
          </div>
          <h3 className="font-semibold text-green-800 dark:text-green-200">Done</h3>
          <p className="text-green-600 dark:text-green-300 text-sm">You&#39;re good to go!</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default InfoCards
