import React from 'react';

interface TitleProps {
    content: string;
}

function Title({ content }: TitleProps) {    
    return (
        <div className="section-title section-title--bordered">
            <h2>{content}</h2>
        </div>
    )
};

export default React.memo(Title);