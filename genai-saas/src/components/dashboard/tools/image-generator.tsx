"use client";

import { generateImage } from '@/actions/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GenerateImageState } from '@/types/actions';
import React, { useActionState } from 'react';

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
        </div>
    )
}

export default ImageGenerator;
