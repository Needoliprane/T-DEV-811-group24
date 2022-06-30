import { default as cn } from 'classnames';
import styles from './ErrorPage.module.scss';
import utilsStyles from 'styles/utils.module.scss';
import { useNavigate } from 'react-router-dom';

type Props = {
	title: string;
	description: string;
	image?: string;
};

const ErrorPage = ({ title, description, image }: Props) => {
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			{image && <img src={image} alt={title} className={styles.imageContainer} />}
			<div className={styles.titlesContainer}>
				<h1 className={cn(utilsStyles.title, styles.title)}>{title}</h1>
				<h2 className={utilsStyles.title}>{description}</h2>
			</div>
			<button className={utilsStyles.button} onClick={() => navigate('/')}>
				Return to the home page
			</button>
		</div>
	);
};

export default ErrorPage;
