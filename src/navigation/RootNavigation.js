import * as React from 'react';

export const navigationRef = React.createRef();

export function custom_navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}
