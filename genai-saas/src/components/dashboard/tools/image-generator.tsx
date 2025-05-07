"use client";

import { generateImage } from '@/actions/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GenerateImageState } from '@/types/actions';
import React, { useActionState } from 'react';
import { Download } from "lucide-react";

const initialState: GenerateImageState = {
    status: "idle",
}

const ImageGenerator = () => {
    const [state, formAction] = useActionState(generateImage, initialState);

    return (
        <div className='space-y-6'>
            <div className='space-y-4'>
                <form action={formAction} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='keyword'>キーワード</Label>
                        <Input
                            id='keyword'
                            name='keyword'
                            placeholder='作成したい画像のキーワードを入力（例：海、山、都会、自然）'
                            required
                        />
                    </div>
                    <Button>画像を生成する</Button>
                </form>
            </div>

            {/* image preview */}
            {state.imageUrl && (
                <div className='space-4'>
                    <div className='overflow-hidden rounded-lg border bg-background'>
                        <div className='aspect-video relative'>
                            <img
                                src={state.imageUrl}
                                alt='Generated image'
                                className='w-full h-full object-cover'
                            />
                        </div>
                    </div>
                    <Button className='w-full' variant={'secondary'}>
                        <Download className='mr-2' />
                            ダウンロード
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ImageGenerator;
