import type { NextPage } from 'next';
import Head from 'next/head';
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { getComics } from 'dh-marvel/services/marvel/marvel.service';
import { useEffect, useState } from 'react';
import ResponsiveGrid from 'dh-marvel/components/Grid/Grid';
import PaginationOutlined from 'dh-marvel/components/Pagination/paginations';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';

const INITIAL_OFFSET = 0;
const INITIAL_LIMIT = 12;

export async function getServerSideProps() {
    const response = await getComics(INITIAL_OFFSET, INITIAL_LIMIT);
    const initialComics = response?.data?.results || [];
    const limit = response?.data?.count ?? null;
    const initialTotal = response?.data?.total ?? null;

    return {
        props: {
            initialComics,
            limit,
            initialTotal
        }
    };
}

type IndexProps = {
    initialComics: any;
    initialTotal: number;
}

const Index: NextPage<IndexProps> = ({ initialComics, initialTotal }) => {
    const [comics, setComics] = useState(initialComics);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(initialTotal);
    const LIMIT = 12;

    const handlePagination = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const offset = LIMIT * (currentPage - 1);
        getComics(offset, LIMIT).then(response => {
            const comicsData = response?.data?.results || [];
            const comicsTotal = response?.data?.total || 0;

            setComics(comicsData);
            setTotal(comicsTotal);
        });

        localStorage.clear();
    }, [currentPage]);

    return (
        <>
            <Head>
                <title>Inicio | DH MARVEL</title>
                <meta name="description" content="Marvel Store Sitio Web" />
            </Head>
            <LayoutGeneral>
                <BodySingle title={"¡Hola disfruta Marvel Store!"}>
                    {total && (
                        <>
                            <PaginationOutlined count={Math.ceil(total / LIMIT)} page={currentPage} handleChange={handlePagination} />
                            <ResponsiveGrid data={comics} />
                            <PaginationOutlined count={Math.ceil(total / LIMIT)} page={currentPage} handleChange={handlePagination} />
                        </>
                    )}
                </BodySingle>
            </LayoutGeneral>
        </>
    )
}

export default Index;

