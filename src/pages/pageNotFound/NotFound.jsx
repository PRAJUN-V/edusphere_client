import React from 'react'

export const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-400">404</h1>
                <p className="text-2xl font-semibold text-gray-600 mb-4">
                    Oops! Page not found.
                </p>
                <p className="text-md text-gray-500 mb-8">
                    Something went wrong. It's look that your requested<br/>could not be found. It's look 
                    like the link is<br/>broken or the page is removed.
                </p>
                <a
                    href="/"
                    className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                    Go back home
                </a>
            </div>
        </div>
    )
}
