import React from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
interface Props {
  seed?: string;
  large?: boolean;
}
function Avatar({ seed, large }: Props) {
  const { data: session } = useSession();
  return (
    <div
      className={`relative overflow-hidden h-10 w-10 rounded-full border-gray-300 bg-white ${
        large && 'h-20 w20'
      }`}
    >
      <Image
        fill
        alt="Avatar"
        src={`https://avatars.dicebear.com/api/open-peeps/${
          seed || session?.user?.name || 'placeholder'
        }.svg`}
      />
    </div>
  );
}

export default Avatar;
