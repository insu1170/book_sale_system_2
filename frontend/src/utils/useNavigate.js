// utils/useNavigation.js
import {useNavigate} from 'react-router-dom';

const useNavigation = (path, option) => {
    const navigate = useNavigate();

    return () => {
        navigate(path, {state: option});
    };
};

export default useNavigation;
