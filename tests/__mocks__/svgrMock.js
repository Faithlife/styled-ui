// see https://react-svgr.com/docs/jest/

import * as React from 'react';

export default 'svgrurl';

const SvgrMock = React.forwardRef((props, ref) => <span ref={ref} {...props} />);
export const ReactComponent = SvgrMock;
