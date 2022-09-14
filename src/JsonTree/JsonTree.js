import {Link} from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const isObject = value => (typeof value === 'object' && !Array.isArray(value) && value !== null);
const isArray = value => (value instanceof Array);

export default function JsonTree({treeData}) {
    console.log(treeData);
    return (
        <div>
            {isArray(treeData) ? treeData?.map((item, index) => {
                return (
                    <div key={index}>
                        <div>{item.children ? <ArrowRightIcon/> : null}
                            <Link href={'#'}>{item.name}</Link>
                        </div>
                        {item.children ? <div style={{marginLeft: '10px'}}>
                            {item.children.map((child, idx) => {
                                //console.log('Child is ', child);
                                return <JsonTree key={idx} treeData={child}></JsonTree>;
                            })}
                        </div> : null}
                    </div>
                );
            }) : <div>
                <div>{treeData?.children ? <ArrowRightIcon/> : null}
                    <Link href={'#'}>{treeData?.name}</Link>
                </div>
                {treeData?.children ? <div style={{marginLeft: '10px'}}>
                    {treeData?.children.map((child, idx) => {
                        return <JsonTree key={idx} jsonData={child}></JsonTree>;
                    })}
                </div> : null}
            </div>}
        </div>
    );
}