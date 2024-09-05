import React from 'react';

export const Contact = () => {
    return (
        <div
        className="relative flex items-center justify-center h-screen bg-cover bg-center"
        style={{ backgroundImage: 'url(/bgContact.jpg)' }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div> {/* Optional overlay for better text visibility */}
            <div className="relative w-full md:w-1/2 p-4">
                <div className="flex w-full justify-center rounded-md bg-white bg-opacity-30 backdrop-blur-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <div className="w-full">
                        <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
                        <p className="text-lg text-white mb-8">Have any enquiries or suggestions. Feel free to reach us via:</p>
                        <div className="flex flex-col p-0 sm:p-0">
                            <p className="text-2xl font-bold mt-10">Pulari Short Film Festival - PSFF2024</p>
                            <p className="text-xl font-normal mt-4">
                                Tom Joseph 0423923466<br />
                                Roopesh Eringa 0411566629<br />
                            </p>
                            <p className="text-xl font-bold mt-10">Email ID:</p>
                            <p className="text-xl font-normal mt-4">psffpulari@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}