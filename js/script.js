// маска
let element = document.querySelectorAll('.presentation__inputText');
for(let item of element){
   let maskOptions = {
      mask: '+{7}(000)000-00-00'
    };
   let key = 'mask';
   key = IMask(item, maskOptions);
};
/*ленивая загрузка, проблема с картинкой(решена)*/ 
window.onload = () =>{
   const options = {
      threshold: 0.2
   };
   const observer = new IntersectionObserver((entries, observer) =>{
      entries.forEach(entry =>{
         if(entry.isIntersecting && entry.intersectionRatio >= 0.2){
            const targetBlock = entry.target;
            targetBlock.classList.remove('lazy-loading');
            observer.unobserve(targetBlock);
         };
      });
   }, options);
   document.querySelectorAll('[class*="_container"]').forEach((item) =>{
      observer.observe(item);
   });
   let imgSrc = document.querySelectorAll('.imgShorst');
   imgSrc.forEach((item, i) =>{
      let clientWidth = window.innerWidth;
      if(clientWidth <= 991 && i == 0){item.setAttribute('src', '../Сайт_6/img/jpg/room2.jpg');};
      if(clientWidth <= 991 && i == 1){item.setAttribute('src', '../Сайт_6/img/jpg/room21Black.jpg');};
      if(clientWidth <= 991 && i == 1){item.setAttribute('src', '../Сайт_6/img/jpg/room21Black.jpg');};
      if(clientWidth <= 991 && i == 2){item.setAttribute('src', '../Сайт_6/img/jpg/sport3-12.jpg');};
   });
};
/*slider*/
let sliderConteiner = document.querySelectorAll('.slider__conteiner');
for(const item of sliderConteiner){
   const images = item.closest('.slider__conteiner').querySelectorAll('.slider__img');
   const sliderLine = item.closest('.slider__conteiner').querySelector('.slider__items');
   const textView = item.closest('.slider__conteiner').querySelectorAll('.slider__view');
   const lineGreen = item.closest('.slider__conteiner').querySelector('.slider__lineGreen');
   const sliderList = item.closest('.slider__conteiner').querySelector('.slider__list');
   const boxLine = item.closest('.slider__conteiner').querySelector('.slider__line');
   let count = 0;
   let width;
   let sumWidthLine = 0
   boxLine.style.width = `${sliderList.offsetWidth}px`;
   function init(){/*при запуске страницы*/
      width = item.closest('.slider__conteiner').offsetWidth;/*получаем ширину видимой области*/
      sliderLine.style.width = width*images.length + 'px';/**ширина slider с картинками*/
      images.forEach(item =>{
         item.style.width = width + 'px';/*к каждой картинке задаём ширину видимой области*/
         item.style.height = 'auto';/**подтягиваю высоту чтобы сохранить пропорции */
      });
      rollSlider();
      greenLineMove();
      document.querySelectorAll('.main__inteko_container').forEach(item =>{
         if(item){
            document.querySelector('.main__inteko_container').style.backgroundPosition = -(1180 - item.offsetWidth) + 'px'
         };
      });
   };
   init(); 
   window.addEventListener('resize', init);/*навесил событие на окно, при изменении ширины будет запускаться функция*/
   item.closest('.slider__conteiner').querySelectorAll('.slider__next').forEach(item =>{
      item.addEventListener('click', () =>{
         sumWidthLine += textView[count].offsetWidth+16;
         count++;
         if(count >= images.length){
            count = 0;
            sumWidthLine = 0;
         };
         rollSlider(); 
         targetText();
         greenLineMove();
      });
   });
   item.closest('.slider__conteiner').querySelectorAll('.slider__prev').forEach(item =>{
      item.addEventListener('click', () =>{
         count--;
         if(count < 0){
            count = images.length-1;/*получаю индекс последней картинки*/
            textView.forEach(item =>{
               sumWidthLine += item.offsetWidth+16;
            });
         };
         sumWidthLine -= textView[count].offsetWidth+16;
         rollSlider();
         targetText();
         greenLineMove();
      });
   });
   for(let item of textView){
      item.addEventListener('click', event =>{
         sumWidthLine = 0;
         let data = event.currentTarget.dataset.viewcount;
         count = data;
         for(let i = 0; i < data; i++){
            sumWidthLine += textView[i].offsetWidth+16;
         };
         rollSlider();
         targetText();
         greenLineMove();
      });
   };
   function rollSlider(){/*считаю величину на которую нужно перемотать*/
      sliderLine.style.transform= `translate(-${count * width + count*20}px)`;
   };   
   function targetText(){
      item.closest('.slider__conteiner').querySelector('.slider__view_white').classList.remove('slider__view_white');
      item.closest('.slider__conteiner').querySelector(`[data-viewcount="${count}"]`).classList.add('slider__view_white');
   };
   function greenLineMove(){
      let widthLine = textView[count].offsetWidth;
      lineGreen.style.width = `${widthLine+16}px`;
      lineGreen.style.transform = `translate(${sumWidthLine}px, 0)`;
   };
};
/*модальное окно*/
const modalWindownBody = document.querySelectorAll('.modalWindown__body');
let dataTarget;     
let conentActiv;                                    
document.querySelectorAll('[data-modalwindiwn]').forEach(item =>{
   item.addEventListener('click', event =>{
      event.preventDefault();
      dataTarget = document.querySelector(event.target.dataset.modalwindiwn);
      conentActiv = dataTarget.querySelector('.modalWindown__conteiner');
      if(dataTarget){
         dataTarget.classList.add('modalWindown__active');
         document.body.style.overflow ='hidden'
         conentActiv.classList.add('modalWindown__conteiner_active');
      };
      document.querySelectorAll('.modalWindown__closeActive').forEach(item =>{
         item.addEventListener('click', () =>{
            removeActiveClass(dataTarget, conentActiv);
         });
      });
      for(let block of modalWindownBody){
         block.addEventListener('click', event =>{
            if(event.target == block){
               removeActiveClass(dataTarget, conentActiv);
            };
         });
      };
   });
});
function removeActiveClass(dataTarget, conentActiv){
   dataTarget.classList.remove('modalWindown__active');
   conentActiv.classList.remove('modalWindown__conteiner_active');
   document.body.style.overflow ='auto';
};
/*какая недвижимость вас интересует(тест)*/
let clickNext = 0;
let clickBack = 0;
let modalIndex = 0;
const greenConteiner = document.querySelectorAll('.modalWindown__conteiner_green');
const nextBut = document.querySelectorAll('.blockHText__button_greenNext');
for(let item of greenConteiner){
   const ifeldCheck = item.closest('.modalWindown__conteiner_green').querySelectorAll('.blockHText__text_cardFieldCheckA');
   ifeldCheck.forEach(item =>{   
      item.addEventListener('click', () =>{
         item.classList.toggle('blockHText__text_cardFieldCheckActive');
         if(item.classList.contains('blockHText__text_cardFieldCheckActive')){
            nextBut[modalIndex].classList.add('blockHText__button_greenNextActive');
            clickNext++;
         }  else{
            clickNext--; 
         }  if(clickNext == 0){
            nextBut[modalIndex].classList.remove('blockHText__button_greenNextActive');
         };
      });
   });    
};  
document.querySelectorAll('[data-modalwindiwnnext]').forEach(item =>{
   item.addEventListener('click', event =>{
      event.preventDefault();
      if(nextBut[modalIndex].classList.contains('blockHText__button_greenNextActive')){
         modalIndex++;
         searchItem(event);
         document.querySelectorAll(`[data-ListItem='${modalIndex}']`).forEach(item =>{
            item.classList.add('blockHText_greenTextListItemActive');
         }); 
      };
   });
}); 
document.querySelectorAll('[data-modalwindiwnback]').forEach(item =>{
   item.addEventListener('click', event =>{
      event.preventDefault();
      event.stopPropagation();
      modalIndex--;
      searchItem(event);
      document.querySelectorAll(`[data-ListItem='${modalIndex+1}']`).forEach(item =>{
         item.classList.remove('blockHText_greenTextListItemActive');
      }); 
   });
});    
function searchItem(event){
   const dataTarget = document.querySelector(event.target.dataset.windiwnbackmodal);
   document.querySelector('.modalWindown__conteiner_active').classList.remove('modalWindown__conteiner_active');
   dataTarget.classList.add('modalWindown__conteiner_active');    
   let arrChek = dataTarget.querySelectorAll('.blockHText__text_cardFieldCheckActive');
   if(arrChek.length > 0){
      arrChek.forEach(() =>{
         clickBack = arrChek.length;
      });
      clickNext = clickBack;
   } else{clickNext = 0;};
};
document.querySelectorAll('.blockHText__text_card-whiteA').forEach(item => {
   item.addEventListener('click', event =>{
      document.querySelectorAll('.blockHText__text_card-whiteActive').forEach(item =>{
         if(item){
            item.classList.remove('blockHText__text_card-whiteActive');
         };
      });
      clickNext = 2;
      event.currentTarget.classList.add('blockHText__text_card-whiteActive');
   });
}); 
const colorChek = document.querySelectorAll('.blockHText__text_card-color');
for(let item of colorChek){
   item.addEventListener('click', event =>{
      const colorTarget = document.querySelector(event.currentTarget.dataset.chekwhite);
      document.querySelectorAll('.blockHText__text_cardImgMain-colorActive').forEach(item =>{
         if(item){
            item.classList.remove('blockHText__text_cardImgMain-colorActive');
            document.querySelectorAll('.fieldText__active').forEach(item =>{
               item.classList.remove('fieldText__active');
            });
         };
      });
      colorTarget.classList.add('blockHText__text_cardImgMain-colorActive');
      item.querySelector('div.blockHText__text_cardH-margColor span').classList.add('fieldText__active');
      const textNetwork = event.currentTarget.querySelector('div.blockHText__text_cardH-margColor span').innerHTML;
      document.querySelector('.presentation__inputButton-color').innerHTML= `Получить варианты ${textNetwork}`;
   });
};
document.querySelectorAll('.blockHText__button_greenIndex').forEach(item =>{
   item.addEventListener('click', event =>{  
      const dataTarget = document.querySelector(event.target.dataset.modalwindiwn);
      if(modalIndex > 0){
         document.querySelectorAll('.modalWindown__conteiner_active').forEach(item =>{
            if(item){dataTarget.querySelector('.modalWindown__conteiner').classList.remove('modalWindown__conteiner_active');};
         });
      };
   });
});
const formTextLint = document.querySelectorAll('.presentation__inputButton-color');
for(let item of formTextLint){
   item.addEventListener('click', (event) =>{
      item.classList.remove('modalWindown__closeActive');
      event.preventDefault();
      document.querySelector('#modalWindown_greenEight').querySelectorAll('.blockHText__text_cardImgMain-colorActive').forEach(blockHText =>{
         if(blockHText){
            window.open('./west-garden-thanks.html');
            item.classList.add('modalWindown__closeActive');
            removeActiveClass(dataTarget, conentActiv);
         };
      });
   });
};

