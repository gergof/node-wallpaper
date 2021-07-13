import Cinnamon from './cinnamon';
import Dconf from './dconf';
import Dcop from './dcop';
import Feh from './feh';
import Gconftool2 from './gconftool2';
import Gnome from './gnome';
import Mate from './mate';
import Nitrogen from './nitrogen';
import Pcmanfm from './pcmanfm';
import Qdbus from './qdbus';
import Setroot from './setroot';
import XfconfQuery from './xfconfQuery';

const backgroundManagers = [
	new Cinnamon(),
	new Dconf(),
	new Dcop(),
	new Feh(),
	new Gconftool2(),
	new Gnome(),
	new Mate(),
	new Nitrogen(),
	new Pcmanfm(),
	new Qdbus(),
	new Setroot(),
	new XfconfQuery()
];

export default backgroundManagers;
