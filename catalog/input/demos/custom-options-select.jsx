import React, { useState, useRef, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Box } from '../../../components/Box';
import { Select } from '../../../components/text-input-v2';
import * as Styled from './styled.jsx';

const menuItemSize = 56;
const menuListMaxHeight = 400;
export function CustomOptionsSelectDemo() {
	const [selection, setSelection] = useState('');

	const handleGroupChanged = useCallback(
		group => {
			setSelection(group.value);
		},
		[setSelection]
	);

	return (
		<div>
			<div>Current selection: {selection}</div>
			<Select
				onChange={handleGroupChanged}
				isSearchable={false}
				options={[
					{ value: "washington", group: "Washington", link:"", subtitle: "yo", avatar:"https://files.logoscdn.com/v1/files/42382171/content.svg?signature=6V_cO8zkG4kob-qZTjNlJkCuNTA" },
					{ value: "california", group: "California", link:"", subtitle: "yo", avatar:"https://files.logoscdn.com/v1/files/42382171/content.svg?signature=6V_cO8zkG4kob-qZTjNlJkCuNTA" },
					{ value: "Texas", group: "Texas", link:"", subtitle: "yo", avatar:"https://files.logoscdn.com/v1/files/42382171/content.svg?signature=6V_cO8zkG4kob-qZTjNlJkCuNTA" }
				]}
				placeholder="Choose a state..."
				components={{ MenuList: VirtualizedMenuList }}
			/>
		</div>
	);
}

const MenuListContainer = React.forwardRef(function MenuListContainer(props, ref) {
	return <Box ref={ref} {...props} />;
});

function MenuItem({ data, index, style }) {
	return (
		<Styled.MenuItem style={style}>
			<Styled.Avatar src={data[index].props.data.avatar} />
			<Styled.GroupInfo>
				<Styled.GroupName>{data[index].props.data.group}</Styled.GroupName>
				<Styled.GroupSubtitle>{data[index].props.data.subtitle}</Styled.GroupSubtitle>
			</Styled.GroupInfo>
		</Styled.MenuItem>
	);
}

// TODO support grouped items or variable sizes if this is used elsewhere
function VirtualizedMenuList({ innerRef, children: _children }) {
	const listRef = useRef(null);

	const children = React.Children.toArray(_children);
	const itemCount = children.length;

	return (
		<List
			ref={listRef}
			outerRef={innerRef}
			height={Math.min(menuListMaxHeight, itemCount * menuItemSize)}
			itemCount={itemCount}
			itemSize={menuItemSize}
			width={'100%'}
			itemData={children}
			innerElementType={MenuListContainer}
		>
			{MenuItem}
		</List>
	);
}
