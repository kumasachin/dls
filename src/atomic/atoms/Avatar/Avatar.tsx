import React from 'react';

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, initials, size = 40, ...props }) =>
  src ? (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ borderRadius: '50%', objectFit: 'cover' }}
      {...props}
    />
  ) : (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#eee',
        fontWeight: 600,
        fontSize: size / 2,
        color: '#555',
      }}
    >
      {initials}
    </span>
  );

export default Avatar;
