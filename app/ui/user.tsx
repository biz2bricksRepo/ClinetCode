import {
 UserIcon
} from '@heroicons/react/24/outline';
export default function User(){
    return(
        <div>
          <UserIcon className='w-6' /><p className="hidden md:block">Rahul Suryawnashi</p>
        </div>
    );
}