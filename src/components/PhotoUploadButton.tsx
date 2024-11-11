'use client'

import { Button, cn, Image } from '@nextui-org/react'
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { HTMLAttributes } from 'react'
import { BiTrash } from 'react-icons/bi'
import { HiPhoto } from 'react-icons/hi2'

type PhotoUploadProps = {
  onUploadImage: (result: CloudinaryUploadWidgetResults) => void
  photoURL: string
  removePhoto: () => void
} & HTMLAttributes<HTMLDivElement>

export function PhotoUploadButton({
  onUploadImage,
  photoURL,
  removePhoto,
  ...props
}: PhotoUploadProps) {
  return (
    <div className="space-y-2">
      {photoURL && (
        <div className="relative h-24 w-24">
          <Image
            className="aspect-square object-cover"
            src={photoURL}
            alt="Foto do item"
          />
          <Button
            className="absolute right-1 top-1 z-10 h-8 w-8 min-w-fit p-0"
            variant="solid"
            color="danger"
            onClick={removePhoto}
          >
            <BiTrash className="text-white" size={18} />
          </Button>
        </div>
      )}
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onSuccess={onUploadImage}
        signatureEndpoint="/api/sign-image"
        uploadPreset="sabor-prime"
        className={cn(
          'flex max-w-max items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-white transition hover:border-secondary/70',
          props.className,
        )}
      >
        <HiPhoto size={28} />
        <span className="h-5">Carregar a foto</span>
      </CldUploadButton>
    </div>
  )
}
