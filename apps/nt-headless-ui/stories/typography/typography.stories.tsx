import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { type ReactNode } from 'react'

type DocsCanvasProps = {
    children?: ReactNode
}

function DocsCanvas({ children }: Readonly<DocsCanvasProps>) {
    return <>{children}</>
}

const meta: Meta<typeof DocsCanvas> = {
    title: 'Foundation/Typography',
    component: DocsCanvas,
    tags: ['autodocs']
}

export default meta

const DemoWrapper = ({
    children
}: Readonly<{ children: ReactNode }>) => (
    <div className="demo-wrapper">{children}</div>
)

export const Mulish: StoryObj<typeof DocsCanvas> = {
    args: {
        children: (
            <DemoWrapper>
                <div className="flex flex-row gap-4">
                    <p className="font-sans nt-fw-black nt-text nt-text-2xl min-w-[200px]">
                        900 Black
                    </p>
                    <p className="font-sans nt-fw-black nt-text nt-text-2xl">
                        abcdefghijklmnopqrstuvwxyz
                    </p>
                </div>
                <div className="flex flex-row gap-4">
                    <p className="font-sans nt-fw-extrabold nt-text nt-text-2xl min-w-[200px]">
                        800 Extra Bold
                    </p>
                    <p className="font-sans nt-fw-extrabold  nt-text-2xl">
                        abcdefghijklmnopqrstuvwxyz
                    </p>
                </div>

                <div className="flex flex-row gap-4">
                    <p className="font-sans nt-fw-bold nt-text nt-text-2xl min-w-[200px]">
                        700 Bold
                    </p>
                    <p className="font-sans nt-fw-bold nt-text nt-text-2xl">
                        abcdefghijklmnopqrstuvwxyz
                    </p>
                </div>

                <div className="flex flex-row gap-4">
                    <p className="font-sans nt-fw-semibold  nt-text-2xl min-w-[200px]">
                        600 Semibold
                    </p>
                    <p className="font-sans nt-fw-semibold  nt-text-2xl">
                        abcdefghijklmnopqrstuvwxyz
                    </p>
                </div>
                <div className="flex flex-row gap-4">
                    <p className="font-sans nt-fw-medium  nt-text-2xl min-w-[200px]">
                        500 Medium
                    </p>
                    <p className="font-sans nt-fw-medium  nt-text-2xl">
                        abcdefghijklmnopqrstuvwxyz
                    </p>
                </div>
                <div className="flex flex-row gap-4">
                    <p className="font-sans nt-fw-regular  nt-text-2xl min-w-[200px]">
                        400 Regular
                    </p>
                    <p className="font-sans nt-fw-regular  nt-text-2xl">
                        abcdefghijklmnopqrstuvwxyz
                    </p>
                </div>
                <div className="flex flex-row gap-4">
                    <p className="font-sans nt-fw-light  nt-text-2xl min-w-[200px]">
                        300 Light
                    </p>
                    <p className="font-sans nt-fw-light  nt-text-2xl">
                        abcdefghijklmnopqrstuvwxyz
                    </p>
                </div>
                <div className="flex flex-row gap-4">
                    <p className="font-sans nt-fw-extralight  nt-text-2xl min-w-[200px]">
                        200 Extra light
                    </p>
                    <p className="font-sans nt-fw-extralight  nt-text-2xl">
                        abcdefghijklmnopqrstuvwxyz
                    </p>
                </div>
                <div className="flex flex-row gap-4">
                    <p className="font-sans nt-fw-thin nt-text-2xl min-w-[200px]">
                        100 Thin
                    </p>
                    <p className="font-sans nt-fw-thin nt-text-2xl">
                        abcdefghijklmnopqrstuvwxyz
                    </p>
                </div>
            </DemoWrapper>
        )
    }
}

export const Headings: StoryObj<typeof DocsCanvas> = {
    args: {
        children: (
            <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-4 min-w-[300px]">
                    <DemoWrapper>
                        <h1 className="nt-fw-bold">Heading 1</h1>
                        <h2 className="nt-fw-bold">Heading 2</h2>
                        <h3 className="nt-fw-bold">Heading 3</h3>
                        <h4 className="nt-fw-bold">Heading 4</h4>
                        <h5 className="nt-fw-bold">Heading 5</h5>
                        <h6 className="nt-fw-bold">Heading 6</h6>
                    </DemoWrapper>
                    <DemoWrapper>
                        <h1 className="nt-fw-thin">Heading 1</h1>
                        <h2 className="nt-fw-thin">Heading 2</h2>
                        <h3 className="nt-fw-thin">Heading 3</h3>
                        <h4 className="nt-fw-thin">Heading 4</h4>
                        <h5 className="nt-fw-thin">Heading 5</h5>
                        <h6 className="nt-fw-thin">Heading 6</h6>
                    </DemoWrapper>
                </div>
                <div className="nt-d-flex nt-flex-col nt-gap-4">
                    <h2>BodyText</h2>
                    <p className="nt-text-group">Group</p>
                    <p className="nt-text-category">Category</p>
                    <p className="nt-text-para-lg">
                        Paragraph large <br />
                        You can apply segmentation to the Path
                        Exploration report, such as viewing the paths
                        for only new users, returning users, or users
                        from a specific country, which helps you
                        tailor optimization strategies for different
                        groups.
                    </p>
                    <p className="nt-text-para-md">
                        Paragraph medium <br />
                        You can apply segmentation to the Path
                        Exploration report, such as viewing the paths
                        for only new users, returning users, or users
                        from a specific country, which helps you
                        tailor optimization strategies for different
                        groups.
                    </p>
                    <p className="nt-text-para-sm">
                        Paragraph small <br /> You can apply
                        segmentation to the Path Exploration report,
                        such as viewing the paths for only new users,
                        returning users, or users from a specific
                        country, which helps you tailor optimization
                        strategies for different groups.
                    </p>
                    <p className="nt-text-para-xs">
                        Paragraph xs <br /> You can apply segmentation
                        to the Path Exploration report, such as
                        viewing the paths for only new users,
                        returning users, or users from a specific
                        country, which helps you tailor optimization
                        strategies for different groups.
                    </p>
                    <div>
                        <p className="nt-text-inline-xs">
                            Text inline xs
                        </p>
                        <p className="nt-text-inline-sm">
                            Text inline sm
                        </p>
                        <p className="nt-text-inline-md">
                            Text inline md
                        </p>
                        <p className="nt-text-inline-lg">
                            Text inline lg
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
