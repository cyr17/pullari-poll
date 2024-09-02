import React from "react";
export const About = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Pullari Short Film Festival</h1>
            <p className="italic mb-8">"To Celebrate Creativity and Storytelling through the art of telling more with less"</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-300 flex items-center justify-center h-64">
                    <img src="https://placehold.co/450x300" alt="Placeholder image for the short film festival" />
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-4">Why the Short Film Festival?</h2>
                    <p className="mb-4">
                        Pullari intends to create a thrilling platform for aspiring filmmakers and storytellers to showcase their creativity and talent concisely yet impactfully. The festival provides an avenue for filmmakers to explore their artistic expression, experiment with storytelling techniques, and communicate powerful messages to a diverse audience. Short films are concise cinematic works, and our festival serves as a stepping stone for emerging talent, offering opportunities for recognition and exposure.
                    </p>
                    <p>
                        Pullari's intention is to attract filmmakers from various backgrounds, cultures, and experiences to foster diversity resulting in viewers being exposed to a wide array of perspectives and storytelling styles of enriching their cinematic experience. In addition, the boundless creativity of filmmakers will connect diverse audiences with their captivating narratives and innovative techniques. Short films convey profound messages concisely, making them powerful tools for raising environmental and socio-cultural issues.
                    </p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-bold mb-4">About Pulllari Victoria Inc</h2>
                    <p className="mb-4">
                        Pullari Victoria Inc. was formed in 2005 as a cultural organisation for the Indian community in Melbourne. From its humble beginning, Pullari is now a well established community organisation that plays a crucial role in fostering a strong and cohesive society. Facilitating effective communication and collaboration among its members and the wider community, the organisation in its present state is proven to conduct events and cultural programs in a multitude of manners.
                    </p>
                    <p>
                        Pullari refers to the collective efforts of members and volunteers when it comes to addressing any challenges that come through when organising any large events. Annual stage shows showcased every year are one such event that has continued its success from the time when the community. Apart from cultural events and other community programs Pullari Victoria also focuses its attention on charity donations both within Australia and internationally.
                    </p>
                </div>
                <div className="bg-gray-300 flex items-center justify-center h-64">
                    <img src="https://placehold.co/450x300" alt="Placeholder image for Pullari Victoria Inc" />
                </div>
            </div>
        </div>
    );
};