import React, {FC, Suspense} from 'react'
import {Divider} from "@nextui-org/divider";
import {Image} from "@nextui-org/image";


const Page = () => {

    return (
        <Suspense>
            <div className={'max-w-[1440px] w-full flex flex-col mx-auto items-start gap-10'}>
                <div className={'flex flex-col gap-6'}>
                    <h1 className={'text-4xl font-bold'}>Как создать заявку?</h1>
                    <div className={'flex flex-col gap-4 pl-10'}>
                        <ol type={'1'} className={'flex flex-col gap-4 list-decimal'}>
                            <li>Перейдите на страницу <strong>"Активные заявки"</strong>.</li>
                            <li>Нажмите на кнопку <strong>"Создать заявку"</strong>.</li>
                            <Image src={'create-ticket-1.png'} alt={'create-ticket-1'} width={1000} height={400}/>
                            <li>Заполните форму заявки:
                                <ul className={'pl-4 list-disc pt-2 flex flex-col gap-2'}>
                                    <li><strong>Название</strong>: кратко опишите проблему или вопрос.</li>
                                    <li><strong>Описание</strong>: подробно изложите суть проблемы.</li>
                                    <li><strong>Отдел(если такого поля нету, то просто пропустите этот пункт)</strong>: выберите из списка более подходящий отдел для решения вашей проблемы.
                                    </li>
                                </ul>
                            </li>
                            <Image src={'create-ticket-2.png'} alt={'create-ticket-2'} width={500} height={400}/>
                            <li>Если необходимо, прикрепите файл, такой как скриншот или документ, нажав на
                                кнопку <strong>"Загрузить файл"</strong>.
                            </li>
                            <li>Нажмите <strong>"Создать заявку"</strong>.</li>
                        </ol>
                    </div>
                </div>
                <Divider/>
                <div className={'flex flex-col gap-6'}>
                    <h1 className={'text-4xl font-bold'}>Как найти свою заявку?</h1>
                    <div className={'flex flex-col gap-4 pl-10'}>
                        <ol type={'1'} className={'flex flex-col gap-4 list-decimal'}>
                            <li>Если вы знаете статус вашей заявки(<strong>"Активная"</strong> или <strong>"Завершенная"</strong>), то нажмите на соответствующий пункт в меню, в ином случае перейдите во <strong>"Все заявки"</strong>.</li>
                            <Image src={'search-ticket-1.png'} alt={'search-ticket-1'} width={300} height={400}/>
                            <li>В поле "Поиск" вы можете ввести часть названия или полностью название вашей заявки.</li>
                            <Image src={'search-ticket-2.png'} alt={'search-ticket-2'} width={1000} height={400}/>
                            <li>Подождите секунду или нажмите <strong>Enter</strong> на клавиатуре.</li>
                            <li>Вы увидите список всех ваших заявок с названием которое похоже на то, что вы ввели в поиск. У заявок вы сможете увидеть название, краткое описание, дату создания и статус. Для просмотра деталей
                                нажмите нужную заявку.
                            </li>
                            <Image src={'search-ticket-3.png'} alt={'search-ticket-3'} width={1000} height={400}/>
                        </ol>
                    </div>
                </div>
                <Divider/>
                <div className={'flex flex-col gap-6'}>
                    <h1 className={'text-4xl font-bold'}>Появились дополнительные данные или есть вопрос по заявке?</h1>
                    <div className={'flex flex-col gap-4 pl-10'}>
                        <ol type={'1'} className={'flex flex-col gap-4 list-decimal'}>
                            <li>Откройте нужную заявку, следуя инструкциям из раздела <strong>"Как найти свою
                                заявку?"</strong>.
                            </li>
                            <li>Справа вы увидите всю информацию о заявке, а также кто над ней работает, а слева будет окно с чатом, туда вы можете написать ваше сообщение, дополнение, вопрос.
                            </li>
                            <Image src={'message-ticket-1.png'} alt={'message-ticket-1'} width={500} height={400}/>
                            <li>Введите дополнительную информацию или задайте вопрос в текстовое поле, также при необходимости вы можете нажать на иконку скрепки и прикрепить файл.</li>
                            <Image src={'message-ticket-2.png'} alt={'message-ticket-2'} width={500} height={400}/>
                            <li>Нажмите <strong>"{'>'}"</strong>.</li>
                        </ol>
                        <p>Ваше сообщение будет отправлено, и администратор получит уведомление о
                            новых сообщении.</p>
                        <Image src={'message-ticket-3.png'} alt={'message-ticket-3'} width={500} height={400}/>

                    </div>
                </div>
            </div>
        </Suspense>
    )
}

export default Page