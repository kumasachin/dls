import React from 'react';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { Text } from '../../atoms/Text/Text';

export interface UserInfoProps {
  name: string;
  imageUrl?: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
}

const getSizeStyle = (size: UserInfoProps['size']) => {
  switch (size) {
    case 'sm':
      return { avatar: 32, nameSize: 14, subtitleSize: 12 };
    case 'lg':
      return { avatar: 64, nameSize: 18, subtitleSize: 14 };
    default: // md
      return { avatar: 48, nameSize: 16, subtitleSize: 13 };
  }
};

export const UserInfo: React.FC<UserInfoProps> = ({ name, imageUrl, subtitle, size = 'md' }) => {
  const sizeStyle = getSizeStyle(size);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Avatar src={imageUrl} size={sizeStyle.avatar} alt={name} />
      <div>
        <Text style={{ fontSize: sizeStyle.nameSize, fontWeight: 500 }}>{name}</Text>
        {subtitle && (
          <Text style={{ fontSize: sizeStyle.subtitleSize, color: '#666666' }}>{subtitle}</Text>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
