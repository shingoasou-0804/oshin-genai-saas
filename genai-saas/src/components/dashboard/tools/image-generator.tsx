import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react'

const ImageGenerator = () => {
  return (
    <div className='space-y-6'>
        <div className='space-y-4'>
            <form action='' className='space-y-4'>
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
