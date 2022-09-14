import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import {Container, Link} from "@mui/material";
import rootObj from './json/sample.json';
import {useEffect, useState} from "react";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const isObject = value => (typeof value === 'object' && !Array.isArray(value) && value !== null);
const isArray = value => (value instanceof Array);

function createTree(obj) {
    if (isObject(obj)) {
        return Object.entries(obj).map(([key, value]) => {
            return {name: key, children: createTree(value)}
        });
    } else if (isArray(obj)) {
        return obj.map((item, index) => ({name: index, children: createTree(item)}));
    } else {
        return null;
    }
}

function correctRoot(obj){
    return {name: 'Root Obj', children: obj};
}

export default function BasicGrid() {

    const [current, setCurrent] = useState('');
    useEffect(() => {
        setCurrent(correctRoot(createTree(rootObj)));
        console.log('current is : ', current);
    }, []);
    const [navPath, setNavPath] = useState(['Root Object']);

    const elementSelected = childElement => {
        console.log('Clicked element is ', childElement);
        setCurrent(childElement);
    }

    useEffect(() => {
        if (current.name) {
            setNavPath([...navPath, current.name])
        }
    }, [current]);


    return (
        <Container>
            <Box sx={{flexGrow: 1}} style={{marginTop: '100px'}}>
                <Grid container spacing={2}>
                    <Grid xs={6}>
                        <Item>
                            {current?.children?.map((child, index) => <Link href={'#'} key={index}
                                                                 onClick={() => elementSelected(child)}>{child.name}</Link>)}
                        </Item>
                    </Grid>
                    <Grid xs={6}>
                        Nav Path :
                        <Item>{navPath.join(' -> ')}</Item>
                    </Grid>
                </Grid>
            </Box>
        </Container>

    );
}
