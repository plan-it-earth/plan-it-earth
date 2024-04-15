import Image from 'next/image';

export default function EventModal({ title, label, description, alarm, image, closeModal }) {
    return (
        <div className="flex">
            <div className="">
                <span className="" onClick={}>&times;</span>
                <h2>{title}</h2>
                <p>{label}</p>
                <p>{description}</p>
                <p>{alarm}</p>
                <Image src={image} alt="event image" height={100} width={100}/>
            </div>
        </div>
    );
}