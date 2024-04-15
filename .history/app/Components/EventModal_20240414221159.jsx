import Image from 'next/image';

export default function EventModal({ title, label, description, alarm, image, onClose }) {
    
    const stopPropagation = (e) => {
        e.stopPropagation();
    };
    
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center" onClick={onClose}>
            <div className="relative flex flex-col md:flex-row bg-[#35334D] text-white rounded-lg shadow-lg overflow-hidden w-11/12 md:w-1/2 lg:w-1/3" onClick={stopPropagation}>
                <div className="p-6 flex-grow">
                    <h2 className="text-xl font-bold mb-2">{title}</h2>
                    <p className="mb-1">{label}</p>
                    <p className="mb-1">{description}</p>
                    {alarm && alarm !== "-1" && <p className="mb-1">Alarm: {alarm} minutes before</p>}
                    {image && (
                        <div className="mt-4">
                            <Image src={image} alt="Event image" height={100} width={100} className="rounded-md"/>
                        </div>
                    )}
                </div>
                <span className="absolute top-2 right-2 cursor-pointer text-2xl" onClick={onClose}>&times;</span>
            </div>
        </div>
    );
}