import { useRouter } from 'next/router';
import MailResponse from '../../components/MailResponse'
import Header from '../../components/smallElements/Header';


function MailNumberPage() {
    const router = useRouter();
    const { mailNumber } = router.query;

    return (
        <main>
            <Header displayMenu={false}/>

                <MailResponse mailNumber={mailNumber} />
        </main>
    );
}

export default MailNumberPage;

