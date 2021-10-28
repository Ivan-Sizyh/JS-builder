// const menuButton = document.querySelector('.menu-button');
// const menu = document.querySelector('.header');
// menuButton.addEventListener('click', function () {
// 	menuButton.classList.toggle('menu-button-active');
// 	menu.classList.toggle('header-active');
// })

const getElement = (tagName, classNames, attributes) => {
	const element = document.createElement(tagName);

	if(classNames){
		element.classList.add(...classNames)
	}

	if(attributes){
		for(const attribute in attributes){
			element[attribute] = attributes[attribute];
		}
	}

	return element;
};

const createHeader = (param) => {
	const header = getElement(`header`);
	container = getElement(`div`,[`container`]);
	const wrapper = getElement(`div`, [`header`]);

	if(param.header.logo){
		const logo = getElement(`img`,[`logo`],{
			src: param.header.logo,
			alt: `Логотип` + param.title,
		});
		wrapper.append(logo);
	}

	if(param.header.menu) {
		const nav = getElement(`nav`,[`menu-list`]);
		const navLinks = param.header.menu.map(item => {
			const navLink = getElement(`a`,[`menu-link`]);
			navLink.href = item.link;
			navLink.innerHTML = item.title;
			return navLink
		})
		nav.append(...navLinks);
		wrapper.append(nav);
	}

	if(param.header.social) {
		const socialWrapper = getElement(`div`,[`social`]);
		const allSocial = param.header.social.map(item => {
			const socialLink = getElement(`a`,[`social-link`]);
			socialLink.append(getElement(`img`, [],{
				src: item.image,
				alt: item.title,
			}))
			socialLink.href = item.link;
			return socialLink;
		});
		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);
	}

	header.append(container);
	container.append(wrapper);

	return header;
};

const createMain = ({title, main:{genre, rating, description, trailer,playButton, slider}}) => {
	const main = getElement('main');
	const container = getElement(`div`,[`container`]);
	main.append(container);
	const wrapper = getElement(`div`,[`main-content`]);
	container.append(wrapper);
	const content = getElement(`div`,[`content`]);
	wrapper.append(content);

	if(genre) {
		const genreSpan = getElement(`span`,[`genere`,`animated`,`fadeInRight`],{textContent: genre});
		content.append(genreSpan);
	};

	if(rating) {
		const ratingBlock = getElement('div',['rating', 'animated', 'fadeInRight']);
		const ratingStars = getElement('div',['rating-stars']);
		const ratingNumber = getElement('div',['rating-number'],{
			textContent:`${rating}/10`
		})

		for(let i = 0; i < 10; i++) {
			const star = getElement(`img`,[`star`],{
				alt:i ? '' : `Рейтинг ${rating} из 10`,
				src:i < rating ? 'img/star.svg' : 'img/star-o.svg',
			})
			ratingStars.append(star);
		}

		ratingBlock.append(ratingStars, ratingNumber);
		content.append(ratingBlock);
	};

	content.append(getElement(`h1`,['main-title', 'animated','fadeInRight'],{
		textContent: title,
	}))

	if(description){
		const descriptionElem = getElement(`p`,['main-description', 'animated', 'fadeInRight'],{
			textContent:description,
		});
		content.append(descriptionElem);
	}

	if(trailer){
		const trailerElem = getElement(`a`,[`button`,`animated`,`fadeInRight`,`youtube-modal`],{
			textContent:`Смотреть трейлер`,
			href: trailer,
		});
		content.append(trailerElem);
	}

	if(playButton){
		const playButtonElem = getElement('a',['play','youtube-modal'],{
			href: trailer
		})
		playButtonElem.append(getElement(`img`,['play-img'],{
			src:playButton,
			alt:'Play',
		}));
		wrapper.append(playButtonElem);
	}

	if(slider){
		const sliderBlock = getElement('div',['series']);
		const swiperBlock = getElement('div',['swiper-container']);
		const swiperWrapper = getElement('div',['swiper-wrapper']);
		const arrow = getElement('button',['arrow']);

		const slides = slider.map(item => {
			const swiperSlide = getElement('div',['swiper-slide'],{
				href:'#',
			});
			const card = getElement('figure',['card']);
			const cardImage = getElement('img',['card-img'],{
				src:item.img,
				alt:((item.title || '') + ' ' + (item.subtitle || '')).trim(),
			})
			card.append(cardImage);

			if(item.title || item.subtitle){
				const cardDescription = getElement('figcaption',['card-description']);
				cardDescription.innerHTML =`
				${item.subtitle ? `<p class="card-subtitle">${item.subtitle}</p>` : ''}
				${item.title ? `<p class="card-title">${item.title}</p>` : ''}
				`;
				card.append(cardDescription);
			}
			swiperSlide.append(card);
			return swiperSlide;
		});

		swiperWrapper.append(...slides);
		swiperBlock.append(swiperWrapper);
		sliderBlock.append(swiperBlock,arrow);

		container.append(sliderBlock);

		new Swiper(swiperBlock, {
			loop: true,
			navigation: {
				nextEl: arrow,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20
				},
				541: {
					slidesPerView: 2,
					spaceBetween: 40
				}
			}
		});
	}

	return main;
};

const CreateFooter = (param) => {
	const footerElem = getElement('div',['footer']);
	const container = getElement('div',['container']);
	const content = getElement('div',['footer-content']);
	const leftElem = getElement('div',['left']);
	if(param.footer.footerContent){
		leftElem.innerHTML = `<span class="copyright">${param.footer.footerContent}</span>`;
	}
	const rightElem = getElement('div',['right']);
	const nav = getElement('nav',['footer-menu']);
	nav.innerHTML = `<a href="#" class="footer-link">Privacy Policy</a>
	<a href="#" class="footer-link">Terms of Service</a>
	<a href="#" class="footer-link">Legal</a>`;


	rightElem.append(nav);
	content.append(leftElem,rightElem);
	container.append(content);
	footerElem.append(container);

	return footerElem;
}

const movieConstructor = (selector, options) => {
	document.title = options.title;

	const app = document.querySelector(selector);
	app.classList.add(`body-app`);

	app.style.color = options.fontColor || '';
	app.style.backgroundColor = options.backgroundColor || '';

	if(options.subColor) {
		document.documentElement.style.setProperty('--sub-color', options.subColor);
	}

	if(options.favicon) {
		const index = options.favicon.lastIndexOf('.');
		const type = options.favicon.substring(index + 1);

		const favicon = getElement('link', null,{
			rel:'icon',
			href:options.favicon,
			type:'image/' + (type === 'svg' ? 'svg-xml' : type)
		});

		document.head.append(favicon);
	}

	app.style.backgroundImage = options.background  ?
		`url('${options.background}')` : "";

	if(options.header) {
		app.append(createHeader(options));
	}

	if(options.main) {
		app.append(createMain(options))
	}

	if(options.footer) {
		app.append(CreateFooter(options))
	}
};

movieConstructor(".app", {
	title: `Ведьмак`,
	background:`witcher/background.jpg`,
	favicon: `witcher/logo.png`,
	backgroundColor: '#141218',
	subColor: '#9D2929',
	header: {
		logo: `witcher/logo.png`,
		social: [
			{
				title:`Twitter`,
				link:`https://twitter.com`,
				image:`witcher/social/twitter.svg`,
			},
			{
				title:`Instagram`,
				link:`https://instagram.com`,
				image:`witcher/social/instagram.svg`,
			},
			{
				title:`Facebook`,
				link:`https://facebook.com`,
				image:`witcher/social/facebook.svg`,
			},
		],
		menu:[
			{
				title:`Описание`,
				link:`#`,
			},
			{
				title:`Трейлер`,
				link:`#`,
			},
			{
				title:`Отзывы`,
				link:`#`,
			},
		]
	},
	main: {
		genre:'2019,фэнтези',
		rating:'8',
		description:'Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечисти — хоть от чудищ болотных, оборотней и даже заколдованных принцесс',
		trailer:'https://www.youtube.com/watch?v=P0oJqfLzZzQ',
		playButton:'img/play.svg',
		slider: [
			{
			  img: 'witcher/series/series-1.jpg',
			  title: 'Начало конца',
			  subtitle: 'Серия №1',
			},
			{
				img: 'witcher/series/series-2.jpg',
				title: 'Четыре марки',
				subtitle: 'Серия №2',
			},
			{
				img: 'witcher/series/series-3.jpg',
				title: 'Предательская луна',
				subtitle: 'Серия №3',
			},
			{
			img: 'witcher/series/series-4.jpg',
			title: 'Банкеты, ублюдки и похороны',
			subtitle: 'Серия №4',
			},
		  ],
	},
	footer: {
		footerContent: '© 2020 The Witcher. All right reserved.',
	},
});