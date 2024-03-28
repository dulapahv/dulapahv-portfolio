import { useState } from 'react';

import { motion } from 'framer-motion';

import {
  Button,
  Chip,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ScrollShadow,
  Skeleton,
  useDisclosure,
} from '@nextui-org/react';
import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  url: string;
  text: string[];
  new?: boolean;
  badge?: string[];
}

const ProjectCard = ({
  id,
  title,
  description,
  text,
  url,
  new: isNew = false,
  badge,
}: ProjectCardProps) => {
  const [isCoverImgLoaded, setIsCoverImgLoaded] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(
    Array(text.length).fill(false)
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleImgLoad = (index: number) => {
    const updatedLoaded = [...isImgLoaded];
    updatedLoaded[index] = true;
    setIsImgLoaded(updatedLoaded);
  };

  return (
    <motion.div
      className="card card-compact w-96 rounded-md bg-base-100 shadow-lg shadow-BLUE/30 md:card-normal dark:bg-neutral-700 dark:shadow-BLUE/20"
      initial={{ transform: 'translateY(50px)', opacity: 0 }}
      whileInView={{
        transform: 'translateY(0)',
        opacity: 1,
      }}
      transition={{ ease: 'easeOut', duration: 0.7 }}
      viewport={{ once: true }}
    >
      <figure
        onClick={onOpen}
        className='cursor-pointer after:pointer-events-none after:absolute after:left-0 after:top-[226px] after:h-6 after:w-fit after:rounded-tr-lg after:bg-BLACK/60 after:pl-2 after:pr-2 after:pt-0.5 after:text-sm after:text-WHITE after:content-["View_more_images"] hover:after:w-full hover:after:rounded-none'
      >
        <Skeleton isLoaded={isCoverImgLoaded}>
          <Image
            src={`https://assets.dulapahv.dev/images/proj/${id}/1.png`}
            width={1541}
            height={1063}
            alt={id + ' cover'}
            onLoad={() => setIsCoverImgLoaded(true)}
            className="h-[250px] w-screen bg-clip-content object-cover duration-200 hover:brightness-[.85] active:brightness-75"
          />
        </Skeleton>
      </figure>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        size="3xl"
        classNames={{
          wrapper: 'z-[2147483647] overflow-hidden',
          body: 'p-4 pt-1',
          backdrop: 'z-[2147483647]',
          closeButton:
            'btn btn-circle btn-ghost btn-sm z-[2147483647] p-0 text-lg text-RED hover:bg-RED hover:text-WHITE active:bg-RED/80 md:fixed md:text-2xl',
        }}
      >
        <ModalContent>
          <ModalBody>
            <ScrollShadow size={20}>
              <ul className="flex flex-col items-center">
                {text?.map((item, index) => (
                  <li key={index}>
                    <h1 className="m-2 text-BLACK dark:text-WHITE">
                      {index + 1}. {item}
                    </h1>
                    <Skeleton
                      isLoaded={isImgLoaded[index]}
                      classNames={{
                        base: 'rounded-lg',
                      }}
                    >
                      <Image
                        src={`https://assets.dulapahv.dev/images/proj/${id}/${index + 1}.png`}
                        width={750}
                        height={500}
                        alt={id + ' ' + index + 1}
                        onLoad={() => handleImgLoad(index)}
                      />
                    </Skeleton>
                  </li>
                ))}
              </ul>
            </ScrollShadow>
          </ModalBody>
        </ModalContent>
      </Modal>
      <section className="card-body relative">
        <div className="absolute left-0 top-0 w-full">
          <div className="grid grid-cols-4 *:h-[2px]">
            <div className="bg-RED" />
            <div className="bg-BLUE" />
            <div className="bg-YELLOW" />
            <div className="bg-PURPLE" />
          </div>
        </div>
        <div className="card-title relative !mb-0">
          <div className="absolute -top-1 h-[2px] w-8 bg-BLUE" />
          <h1 className="text-BLACK dark:text-WHITE">{title}</h1>
          {isNew && (
            <Chip size="sm" className="bg-RED text-WHITE/90">
              NEW
            </Chip>
          )}
        </div>
        {badge && (
          <div className="card-actions">
            {badge.map((item, index) => (
              <Chip
                key={index}
                variant="bordered"
                size="sm"
                className="border-neutral-400 text-BLACK dark:text-WHITE"
              >
                {item}
              </Chip>
            ))}
          </div>
        )}
        <p className="text-pretty text-justify text-BLACK dark:text-WHITE">
          {description}
        </p>
        <div className="card-actions justify-end">
          <Button
            href={url}
            as={Link}
            isExternal
            radius="sm"
            endContent={<FiExternalLink />}
            className="mt-2 border-1.5 border-b-PURPLE border-l-RED border-r-BLUE border-t-YELLOW bg-transparent text-BLACK ring-BLUE ring-offset-2 hover:border-transparent hover:bg-BLUE hover:!text-white hover:ring-[1.5px] dark:text-WHITE dark:ring-offset-neutral-700"
          >
            Go to Project
          </Button>
        </div>
      </section>
    </motion.div>
    // <>
    //   <Modal
    //     isOpen={isOpen}
    //     onOpenChange={onOpenChange}
    //     scrollBehavior="inside"
    //     size="3xl"
    //     classNames={{
    //       wrapper: 'z-[2147483647] overflow-hidden',
    //       body: 'p-4 pt-1',
    //       backdrop: 'z-[2147483647]',
    //       closeButton:
    //         'btn btn-circle btn-ghost btn-sm z-[2147483647] p-0 text-lg text-RED hover:bg-RED hover:text-WHITE active:bg-RED/80 md:fixed md:text-2xl',
    //     }}
    //   >
    //     <ModalContent>
    //       <ModalBody>
    //         <ScrollShadow size={20}>
    //           <ul className="flex flex-col items-center">
    //             {text?.map((item, index) => (
    //               <li key={index}>
    //                 <h1 className="m-2 text-BLACK dark:text-WHITE">
    //                   {index + 1}. {item}
    //                 </h1>
    //                 <Skeleton
    //                   isLoaded={isImgLoaded[index]}
    //                   classNames={{
    //                     base: 'rounded-lg',
    //                   }}
    //                 >
    //                   <Image
    //                     src={`https://assets.dulapahv.dev/images/proj/${id}/${index + 1}.png`}
    //                     width={750}
    //                     height={500}
    //                     alt={id + ' ' + index + 1}
    //                     onLoad={() => handleImgLoad(index)}
    //                   />
    //                 </Skeleton>
    //               </li>
    //             ))}
    //           </ul>
    //         </ScrollShadow>
    //       </ModalBody>
    //     </ModalContent>
    //   </Modal>
    //   <motion.div
    //     initial={{ transform: 'translateY(50px)', opacity: 0 }}
    //     whileInView={{
    //       transform: 'translateY(0)',
    //       opacity: 1,
    //     }}
    //     transition={{ ease: 'easeOut', duration: 0.7 }}
    //     viewport={{ once: true }}
    //   >
    //     <Card
    //       isFooterBlurred
    //       className="group w-[300px] min-[375px]:w-80 min-[375px]:w-96 sm:w-[30rem] shadow-lg shadow-BLUE/30 dark:bg-neutral-700 dark:shadow-BLUE/20"
    //     >
    //       <CardHeader className="absolute z-10 flex-col items-start">
    //         {isNew && (
    //           <Chip size="sm" className="bg-RED text-WHITE/90">
    //             NEW
    //           </Chip>
    //         )}
    //       </CardHeader>
    //       <Skeleton isLoaded={isCoverImgLoaded} className="h-full w-full">
    //         <Image
    //           width={1920}
    //           height={1080}
    //           alt={id + ' cover'}
    //           onLoad={() => setIsCoverImgLoaded(true)}
    //           className="h-[325px] w-screen bg-clip-content object-cover"
    //           src={`https://assets.dulapahv.dev/images/proj/${id}/1.png`}
    //         />
    //       </Skeleton>
    //       <CardFooter className="absolute bottom-0 z-10 flex flex-col items-start gap-y-2 border-t-1 border-zinc-100/50 bg-white/30 backdrop-blur-sm">
    //         <h4 className="font-medium text-black">{title}</h4>
    //         <div>
    //           {badge &&
    //             badge.map((item, index) => (
    //               <Chip
    //                 key={index}
    //                 variant="flat"
    //                 size="sm"
    //                 className="m-0.5 border-BLACK text-BLACK dark:border-WHITE/80 dark:text-WHITE"
    //               >
    //                 {item}
    //               </Chip>
    //             ))}
    //         </div>
    //         <div className="hidden group-hover:block">
    //           <p className="text-pretty text-justify text-sm text-black">
    //             {description}
    //           </p>
    //           <div className="mt-2 flex gap-x-2">
    //             <Button
    //               onClick={onOpen}
    //               className="border-1.5 border-b-PURPLE border-l-RED border-r-BLUE border-t-YELLOW text-BLACK ring-BLUE ring-offset-2 hover:border-transparent hover:bg-BLUE hover:!text-white hover:ring-[1.5px] dark:text-WHITE dark:ring-offset-neutral-700"
    //               radius="sm"
    //               size="sm"
    //             >
    //               View More Images
    //             </Button>
    //             <Button
    //               href={url}
    //               as={Link}
    //               isExternal
    //               className="border-1.5 border-b-PURPLE border-l-RED border-r-BLUE border-t-YELLOW text-BLACK ring-BLUE ring-offset-2 hover:border-transparent hover:bg-BLUE hover:!text-white hover:ring-[1.5px] dark:text-WHITE dark:ring-offset-neutral-700"
    //               radius="sm"
    //               size="sm"
    //               endContent={<FiExternalLink />}
    //             >
    //               Learn More
    //             </Button>
    //           </div>
    //         </div>
    //       </CardFooter>
    //     </Card>
    //   </motion.div>
    // </>
  );
};

export default ProjectCard;
