import  { useState, useEffect } from 'react';

interface TextTruncateProps {
  text: string;
  maxLength: number;
}

export const TextTruncate = ({ text, maxLength }:TextTruncateProps) => {
  const [truncatedText, setTruncatedText] = useState<string>(text);

  useEffect(() => {
    if (text.length > maxLength) {
      setTruncatedText(text.slice(0, maxLength) + '...');
    } else {
      setTruncatedText(text);
    }
  }, [text, maxLength]);

  return <p className='max-w-prose mx-auto'>{truncatedText}</p>;
};

