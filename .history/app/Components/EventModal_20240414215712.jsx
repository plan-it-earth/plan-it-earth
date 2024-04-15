import Image from 'next/image';

export default function EventModal({ title, label, description, alarm, image, onClose }) {
    return (
        <div className="flex h-96 w-96">
            <span className="" onClick={onClose}>&times;</span>
            <div className="">
                <h2>{title}</h2>
                <p>{label}</p>
                <p>{description}</p>
                <p>{alarm}</p>
                <Image src={image} alt="event image" height={100} width={100}/>
            </div>
        </div>
    );
}