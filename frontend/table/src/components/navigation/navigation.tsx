import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import TableLinks from '../table-links/table-links';
import { AppRoute } from '../../const';

const Navigation = (): JSX.Element => {
  const [isOpen, setOpen] = useState<boolean>(false);
	const activeLink = window.location.pathname;

	return (
		<>
			<div className="finder-tables">
				<div className={`hamburger ${isOpen ? 'open' : 'closed'}`} onClick={() => setOpen(!isOpen)}>
					<MenuIcon />
				</div>
				{ isOpen ? <TableLinks setOpen={setOpen} /> : null }
			</div>
			<Nav variant="tabs">
				<Nav.Item>
					<Link className={`nav-link ${activeLink === AppRoute.Main ? 'active' : 'disable'}`} to={AppRoute.Main}>Курс</Link>
				</Nav.Item>
				<Nav.Item>
					<Link className={`nav-link ${activeLink === AppRoute.Theme ? 'active' : 'disable'}`} to={AppRoute.Theme}>Тема</Link>
				</Nav.Item>
				<Nav.Item>
					<Link className={`nav-link ${activeLink === AppRoute.Knowledge ? 'active' : 'disable'}`} to={AppRoute.Knowledge}>Знание</Link>
				</Nav.Item>
				<Nav.Item>
					<Link className={`nav-link ${activeLink === AppRoute.Quantum ? 'active' : 'disable'}`} to={AppRoute.Quantum}>Кванты знаний</Link>
				</Nav.Item>
				<Nav.Item>
					<Link className={`nav-link ${activeLink === AppRoute.Task ? 'active' : 'disable'}`} to={AppRoute.Task}>Задание</Link>
				</Nav.Item>
				<Nav.Item>
					<Link className={`nav-link ${activeLink === AppRoute.Users ? 'active' : 'disable'}`} to={AppRoute.Users}>
						{ activeLink === AppRoute.Users ?
							<GroupsIcon /> : 
							<GroupsOutlinedIcon />
						} Пользователи
					</Link>
				</Nav.Item>
			</Nav>
		</>
	);
};

export default Navigation;