import { Tooltip } from 'antd';
import React from 'react';


type Props = {
    children?: React.ReactNode;
    content?: React.ReactNode;
    placement?: "top" | "bottom" | "left" | "right" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom";
};


const TooltipComponent:React.FC<Props> = ({children, content, placement}) => {
        
        
        return (
            <div>
                <Tooltip title={content} placement={placement} ><div className='w-max'>{children}</div></Tooltip>
            </div>
        );
        }
export default TooltipComponent;